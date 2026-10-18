"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { SwapRequest } from "@/src/models/SwapRequest";
import { User } from "@/src/models/User";

function normalizeSkills(skills) {
  return Array.isArray(skills)
    ? skills
        .map((skill) => String(skill ?? "").trim())
        .filter(Boolean)
    : [];
}

function getInitials(name) {
  return String(name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function buildDiscoverProfile(currentUser, otherUser, requestsByUserId) {
  const currentTeachSkills = normalizeSkills(currentUser.teachSkills);
  const currentLearnSkills = normalizeSkills(currentUser.learnSkills);
  const otherTeachSkills = normalizeSkills(otherUser.teachSkills);
  const otherLearnSkills = normalizeSkills(otherUser.learnSkills);

  const canTeachYou = currentLearnSkills.filter((skill) =>
    otherTeachSkills.includes(skill),
  );
  const wantsToLearnFromYou = currentTeachSkills.filter((skill) =>
    otherLearnSkills.includes(skill),
  );

  const complementarySkills = Array.from(
    new Set([...canTeachYou, ...wantsToLearnFromYou]),
  );
  const existingRequest = requestsByUserId.get(String(otherUser._id)) ?? null;

  return {
    id: String(otherUser._id),
    name: otherUser.name ?? "Developer",
    image: otherUser.image ?? null,
    headline: otherUser.headline ?? "",
    bio: otherUser.bio ?? "",
    location: otherUser.location ?? "",
    availability: otherUser.availability ?? "",
    teachSkills: otherTeachSkills,
    learnSkills: otherLearnSkills,
    canTeachYou,
    wantsToLearnFromYou,
    complementarySkills,
    compatibilityScore: canTeachYou.length * 2 + wantsToLearnFromYou.length * 2,
    requestStatus: existingRequest?.status ?? null,
    requestId: existingRequest?.id ?? null,
    initials: getInitials(otherUser.name),
  };
}

export async function getDiscoverData() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to discover swap partners." };
  }

  await connectToDatabase();

  const [currentUser, users, requests] = await Promise.all([
    User.findById(session.user.id)
      .select("name teachSkills learnSkills")
      .lean(),
    User.find({ _id: { $ne: session.user.id } })
      .select("name image headline bio location availability teachSkills learnSkills")
      .lean(),
    SwapRequest.find({
      $or: [{ requester: session.user.id }, { receiver: session.user.id }],
    }).lean(),
  ]);

  if (!currentUser) {
    return { error: "Your profile could not be found." };
  }

  const requestsByUserId = new Map();

  for (const request of requests) {
    const requesterId = String(request.requester);
    const receiverId = String(request.receiver);
    const otherUserId =
      requesterId === session.user.id ? receiverId : requesterId;

    const previous = requestsByUserId.get(otherUserId);

    if (
      !previous ||
      new Date(request.updatedAt).getTime() > new Date(previous.updatedAt).getTime()
    ) {
      requestsByUserId.set(otherUserId, {
        id: String(request._id),
        status: request.status,
        updatedAt: request.updatedAt,
      });
    }
  }

  const profiles = users
    .map((user) => buildDiscoverProfile(currentUser, user, requestsByUserId))
    .sort((left, right) => {
      if (right.compatibilityScore !== left.compatibilityScore) {
        return right.compatibilityScore - left.compatibilityScore;
      }

      if (
        right.complementarySkills.length !== left.complementarySkills.length
      ) {
        return right.complementarySkills.length - left.complementarySkills.length;
      }

      return left.name.localeCompare(right.name);
    });

  const topSkills = Array.from(
    new Set(
      profiles.flatMap((profile) => [
        ...profile.canTeachYou,
        ...profile.wantsToLearnFromYou,
      ]),
    ),
  ).slice(0, 8);

  return {
    currentUser: {
      name: currentUser.name ?? "Developer",
      teachSkills: normalizeSkills(currentUser.teachSkills),
      learnSkills: normalizeSkills(currentUser.learnSkills),
    },
    stats: {
      totalProfiles: profiles.length,
      strongMatches: profiles.filter((profile) => profile.compatibilityScore >= 4).length,
      pendingRequests: profiles.filter((profile) => profile.requestStatus === "pending").length,
    },
    topSkills,
    profiles,
  };
}

export async function createSwapRequest(input) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Please sign in to send a swap request." };
  }

  const receiverId = String(input?.receiverId ?? "").trim();
  const teachSkillOffered = String(input?.teachSkillOffered ?? "").trim();
  const learnSkillRequested = String(input?.learnSkillRequested ?? "").trim();
  const message = String(input?.message ?? "")
    .trim()
    .slice(0, 300);

  if (!receiverId || !teachSkillOffered || !learnSkillRequested) {
    return { success: false, error: "Choose both skills before sending a request." };
  }

  await connectToDatabase();

  const [currentUser, receiver] = await Promise.all([
    User.findById(session.user.id).select("teachSkills learnSkills").lean(),
    User.findById(receiverId)
      .select("teachSkills learnSkills name")
      .lean(),
  ]);

  if (!currentUser || !receiver) {
    return { success: false, error: "That swap partner is no longer available." };
  }

  const myTeachSkills = normalizeSkills(currentUser.teachSkills);
  const myLearnSkills = normalizeSkills(currentUser.learnSkills);
  const receiverTeachSkills = normalizeSkills(receiver.teachSkills);
  const receiverLearnSkills = normalizeSkills(receiver.learnSkills);

  if (!myTeachSkills.includes(teachSkillOffered)) {
    return { success: false, error: "You can only offer a skill from your teaching list." };
  }

  if (!myLearnSkills.includes(learnSkillRequested)) {
    return { success: false, error: "You can only request a skill from your learning list." };
  }

  if (!receiverLearnSkills.includes(teachSkillOffered)) {
    return { success: false, error: `${receiver.name} is not currently looking for that skill.` };
  }

  if (!receiverTeachSkills.includes(learnSkillRequested)) {
    return { success: false, error: `${receiver.name} is not offering that skill right now.` };
  }

  const existingRequest = await SwapRequest.findOne({
    $or: [
      { requester: session.user.id, receiver: receiverId, status: { $in: ["pending", "active"] } },
      { requester: receiverId, receiver: session.user.id, status: { $in: ["pending", "active"] } },
    ],
  }).lean();

  if (existingRequest) {
    return {
      success: false,
      error: "A pending or active swap already exists between you and this user.",
    };
  }

  await SwapRequest.create({
    requester: session.user.id,
    receiver: receiverId,
    teachSkillOffered,
    learnSkillRequested,
    message,
    status: "pending",
  });

  revalidatePath("/user/discover");
  revalidatePath("/user/dashboard");
  revalidatePath("/user/requests");

  return { success: true, message: "Swap request sent successfully." };
}

export async function updateDiscoverSkills(input) {
  const session = await auth();

  if (!session?.user?.id) {
    return { success: false, error: "Please sign in to update your skills." };
  }

  const teachSkills = normalizeSkills(input?.teachSkills).slice(0, 20);
  const learnSkills = normalizeSkills(input?.learnSkills).slice(0, 20);

  await connectToDatabase();

  await User.findByIdAndUpdate(
    session.user.id,
    { teachSkills, learnSkills },
    { new: true },
  );

  revalidatePath("/user/discover");
  revalidatePath("/user/profile");
  revalidatePath("/user/dashboard");

  return { success: true, message: "Skills updated successfully." };
}
