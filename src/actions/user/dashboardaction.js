"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { SwapRequest } from "@/src/models/SwapRequest";
import { User } from "@/src/models/User";

function toPlainUser(user) {
  return {
    id: String(user._id),
    name: user.name ?? "Developer",
    image: user.image ?? null,
    headline: user.headline ?? "",
    teachSkills: Array.isArray(user.teachSkills) ? user.teachSkills : [],
    learnSkills: Array.isArray(user.learnSkills) ? user.learnSkills : [],
  };
}

function getInitials(name) {
  return (name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getGreeting() {
  const hour = new Date().getHours();

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 18) {
    return "Good afternoon";
  }

  return "Good evening";
}

function buildMatch(currentUser, otherUser, requestsByUserId) {
  const otherTeachSkills = Array.isArray(otherUser.teachSkills) ? otherUser.teachSkills : [];
  const otherLearnSkills = Array.isArray(otherUser.learnSkills) ? otherUser.learnSkills : [];

  const skillsTheyCanTeachMe = currentUser.learnSkills.filter((skill) =>
    otherTeachSkills.includes(skill),
  );
  const skillsICanTeachThem = currentUser.teachSkills.filter((skill) =>
    otherLearnSkills.includes(skill),
  );

  if (!skillsTheyCanTeachMe.length && !skillsICanTeachThem.length) {
    return null;
  }

  const existingRequest = requestsByUserId.get(String(otherUser._id)) ?? null;

  return {
    id: String(otherUser._id),
    name: otherUser.name ?? "Developer",
    image: otherUser.image ?? null,
    headline: otherUser.headline ?? "",
    initials: getInitials(otherUser.name),
    teaches: skillsTheyCanTeachMe,
    learns: skillsICanTeachThem,
    score: skillsTheyCanTeachMe.length + skillsICanTeachThem.length,
    requestStatus: existingRequest?.status ?? null,
  };
}

export async function getDashboardData() {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to view your dashboard." };
  }

  await connectToDatabase();

  const [currentUser, users, swapRequests] = await Promise.all([
    User.findById(session.user.id).lean(),
    User.find({ _id: { $ne: session.user.id } })
      .select("name image headline teachSkills learnSkills")
      .lean(),
    SwapRequest.find({
      $or: [{ requester: session.user.id }, { receiver: session.user.id }],
    }).lean(),
  ]);

  if (!currentUser) {
    return { error: "Your profile could not be found." };
  }

  const currentUserData = toPlainUser(currentUser);
  const requestsByUserId = new Map();

  for (const request of swapRequests) {
    const requesterId = String(request.requester);
    const receiverId = String(request.receiver);
    const otherUserId =
      requesterId === session.user.id ? receiverId : requesterId;

    requestsByUserId.set(otherUserId, {
      status: request.status,
      updatedAt: request.updatedAt,
    });
  }

  const recentMatches = users
    .map((user) => buildMatch(currentUserData, user, requestsByUserId))
    .filter(Boolean)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.name.localeCompare(right.name);
    });

  const pendingRequests = swapRequests.filter(
    (request) => request.status === "pending",
  ).length;
  const activeSwaps = swapRequests.filter(
    (request) => request.status === "active",
  ).length;

  return {
    greeting: getGreeting(),
    user: {
      ...currentUserData,
      initials: getInitials(currentUserData.name),
    },
    stats: {
      matchesFound: recentMatches.length,
      pendingRequests,
      activeSwaps,
    },
    recentMatches: recentMatches.slice(0, 6),
  };
}
