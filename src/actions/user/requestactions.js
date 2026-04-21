"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { SwapRequest } from "@/src/models/SwapRequest";

function formatUser(user) {
  return {
    id: String(user?._id ?? ""),
    name: user?.name ?? "Developer",
    email: user?.email ?? "",
    image: user?.image ?? null,
    headline: user?.headline ?? "",
  };
}

function formatRequest(request, currentUserId) {
  const receiverId = String(request.receiver?._id ?? request.receiver);
  const isIncoming = receiverId === currentUserId;
  const otherUser = isIncoming ? request.requester : request.receiver;

  return {
    id: String(request._id),
    status: request.status,
    message: request.message ?? "",
    teachSkillOffered: request.teachSkillOffered,
    learnSkillRequested: request.learnSkillRequested,
    createdAt: request.createdAt?.toISOString?.() ?? String(request.createdAt ?? ""),
    updatedAt: request.updatedAt?.toISOString?.() ?? String(request.updatedAt ?? ""),
    direction: isIncoming ? "incoming" : "outgoing",
    requester: formatUser(request.requester),
    receiver: formatUser(request.receiver),
    otherUser: formatUser(otherUser),
  };
}

export async function getRequestsData() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to view your requests." };
  }

  await connectToDatabase();

  const requests = await SwapRequest.find({
    $or: [{ requester: session.user.id }, { receiver: session.user.id }],
  })
    .populate("requester", "name email image headline")
    .populate("receiver", "name email image headline")
    .sort({ updatedAt: -1, createdAt: -1 })
    .lean();

  const items = requests.map((request) => formatRequest(request, session.user.id));

  return {
    incoming: items.filter((item) => item.direction === "incoming" && item.status === "pending"),
    outgoing: items.filter((item) => item.direction === "outgoing" && item.status === "pending"),
    active: items.filter((item) => item.status === "active"),
    history: items.filter((item) =>
      ["completed", "declined", "cancelled"].includes(item.status),
    ),
    stats: {
      incoming: items.filter((item) => item.direction === "incoming" && item.status === "pending").length,
      outgoing: items.filter((item) => item.direction === "outgoing" && item.status === "pending").length,
      active: items.filter((item) => item.status === "active").length,
      history: items.filter((item) => ["completed", "declined", "cancelled"].includes(item.status)).length,
    },
  };
}

export async function updateSwapRequestStatus(input) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Please sign in to update requests." };
  }

  const requestId = String(input?.requestId ?? "").trim();
  const nextStatus = String(input?.status ?? "").trim();

  if (!requestId || !nextStatus) {
    return { success: false, error: "Missing request update details." };
  }

  await connectToDatabase();

  const request = await SwapRequest.findById(requestId);

  if (!request) {
    return { success: false, error: "Request not found." };
  }

  const requesterId = String(request.requester);
  const receiverId = String(request.receiver);
  const currentUserId = session.user.id;

  const isRequester = requesterId === currentUserId;
  const isReceiver = receiverId === currentUserId;

  if (!isRequester && !isReceiver) {
    return { success: false, error: "You do not have access to this request." };
  }

  const currentStatus = request.status;

  const allowedTransitions = {
    pending: isReceiver ? ["active", "declined"] : ["cancelled"],
    active: ["completed", "cancelled"],
    completed: [],
    declined: [],
    cancelled: [],
  };

  if (!allowedTransitions[currentStatus]?.includes(nextStatus)) {
    return { success: false, error: "That action is not allowed for this request." };
  }

  request.status = nextStatus;
  await request.save();

  revalidatePath("/user/requests");
  revalidatePath("/user/discover");
  revalidatePath("/user/dashboard");

  const statusMessages = {
    active: "Request accepted.",
    declined: "Request declined.",
    cancelled: "Request cancelled.",
    completed: "Request marked as completed.",
  };

  return {
    success: true,
    message: statusMessages[nextStatus] ?? "Request updated successfully.",
  };
}
