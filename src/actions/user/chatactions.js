"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { ChatMessage } from "@/src/models/ChatMessage";
import { SwapRequest } from "@/src/models/SwapRequest";

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ensureParticipant(request, userId) {
  const requesterId = String(request.requester?._id ?? request.requester);
  const receiverId = String(request.receiver?._id ?? request.receiver);
  return requesterId === userId || receiverId === userId;
}

function buildPartner(request, userId) {
  const requesterId = String(request.requester?._id ?? request.requester);
  const isRequester = requesterId === userId;
  const partner = isRequester ? request.receiver : request.requester;

  return {
    id: String(partner?._id ?? ""),
    name: partner?.name ?? "Swap Partner",
    initials: (partner?.name ?? "SP")
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    college: partner?.location || "DevSwap Member",
    teaches: isRequester ? request.learnSkillRequested : request.teachSkillOffered,
    learns: isRequester ? request.teachSkillOffered : request.learnSkillRequested,
    online: true,
    lastSeen: "Live chat",
    headline: partner?.headline ?? "",
  };
}

function formatMessage(message, currentUserId) {
  const senderId = String(message.sender?._id ?? message.sender);
  const isMe = senderId === currentUserId;
  const readBy = Array.isArray(message.readBy)
    ? message.readBy.map((entry) => String(entry?._id ?? entry))
    : [];

  let status = "sent";
  if (readBy.length > 1 || (!isMe && readBy.includes(currentUserId))) {
    status = "read";
  } else if (readBy.length >= 1) {
    status = "delivered";
  }

  return {
    _id: String(message._id),
    senderId: isMe ? "me" : "other",
    text: message.text,
    timestamp: formatTime(message.createdAt),
    status,
    createdAt: message.createdAt?.toISOString?.() ?? String(message.createdAt ?? ""),
  };
}

async function getAuthorizedRequest(requestId, userId) {
  await connectToDatabase();

  const request = await SwapRequest.findById(requestId)
    .populate("requester", "name image headline location")
    .populate("receiver", "name image headline location")
    .lean();

  if (!request) {
    return { error: "Chat not found." };
  }

  if (!ensureParticipant(request, userId)) {
    return { error: "You do not have access to this chat." };
  }

  if (["declined", "cancelled"].includes(request.status)) {
    return { error: "This chat is unavailable because the request is closed." };
  }

  return { request };
}

export async function getChatThread(requestId) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to open chat." };
  }

  const access = await getAuthorizedRequest(requestId, session.user.id);
  if (access.error) {
    return { error: access.error };
  }

  const messages = await ChatMessage.find({ request: requestId })
    .populate("sender", "name")
    .sort({ createdAt: 1 })
    .lean();

  return {
    chat: {
      requestId,
      status: access.request.status,
      partner: buildPartner(access.request, session.user.id),
      me: {
        id: session.user.id,
        name: session.user.name ?? "You",
        initials: (session.user.name ?? "ME")
          .split(" ")
          .filter(Boolean)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase(),
      },
      swap: {
        offer:
          String(access.request.requester?._id) === session.user.id
            ? access.request.teachSkillOffered
            : access.request.learnSkillRequested,
        receive:
          String(access.request.requester?._id) === session.user.id
            ? access.request.learnSkillRequested
            : access.request.teachSkillOffered,
      },
      messages: messages.map((message) => formatMessage(message, session.user.id)),
    },
  };
}

export async function getChatMessages(requestId) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to open chat." };
  }

  const access = await getAuthorizedRequest(requestId, session.user.id);
  if (access.error) {
    return { error: access.error };
  }

  const messages = await ChatMessage.find({ request: requestId })
    .populate("sender", "name")
    .sort({ createdAt: 1 })
    .lean();

  return {
    messages: messages.map((message) => formatMessage(message, session.user.id)),
  };
}

export async function sendChatMessage(input) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Please sign in to send messages." };
  }

  const requestId = String(input?.requestId ?? "").trim();
  const text = String(input?.text ?? "").trim();

  if (!requestId || !text) {
    return { success: false, error: "Message text is required." };
  }

  if (text.length > 2000) {
    return { success: false, error: "Message is too long (max 2000 characters)." };
  }

  const access = await getAuthorizedRequest(requestId, session.user.id);
  if (access.error) {
    return { success: false, error: access.error };
  }

  const message = await ChatMessage.create({
    request: requestId,
    sender: session.user.id,
    text: text.slice(0, 2000),
    readBy: [session.user.id],
  });

  // Populate sender so formatMessage can resolve sender._id correctly
  const populated = await message.populate("sender", "name");

  return {
    success: true,
    message: formatMessage(populated.toObject(), session.user.id),
  };
}

export async function markChatRead(requestId) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Please sign in to open chat." };
  }

  const access = await getAuthorizedRequest(requestId, session.user.id);
  if (access.error) {
    return { success: false, error: access.error };
  }

  await ChatMessage.updateMany(
    {
      request: requestId,
      sender: { $ne: session.user.id },
      readBy: { $ne: session.user.id },
    },
    {
      $addToSet: { readBy: session.user.id },
    },
  );

  return { success: true };
}
