"use server";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { User } from "@/src/models/User";

function normalizeImageUrl(value) {
  const raw = String(value ?? "").trim();

  if (!raw) {
    return "";
  }

  const extracted = raw.match(/src\s*=\s*["']([^"']+)["']/i)?.[1] ?? raw;

  try {
    const parsed = new URL(extracted);

    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.toString();
    }
  } catch {
    return "";
  }

  return "";
}

// ─── Get Current User Profile ────────────────────────────────────────────────
export async function getProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await connectToDatabase();
    const user = await User.findById(session.user.id).lean();
    if (!user) return { success: false, error: "User not found" };

    return {
      success: true,
      data: {
        name: user.name,
        email: user.email,
        image: user.image || null,
        coverImage: user.coverImage || null,
        headline: user.headline || "",
        bio: user.bio || "",
        location: user.location || "",
        teachSkills: user.teachSkills || [],
        learnSkills: user.learnSkills || [],
        availability: user.availability || "",
        createdAt: user.createdAt?.toISOString() || null,
      },
    };
  } catch (err) {
    console.error("[getProfile]", err);
    return { success: false, error: "Failed to load profile" };
  }
}

// ─── Update Basic Info ────────────────────────────────────────────────────────
export async function updateBasicInfo(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const name = formData.get("name")?.toString().trim();
  const headline = formData.get("headline")?.toString().trim() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const availability = formData.get("availability")?.toString().trim() ?? "";

  if (!name || name.length < 2 || name.length > 80) {
    return { success: false, error: "Name must be 2–80 characters" };
  }
  if (headline.length > 120) {
    return { success: false, error: "Headline must be ≤ 120 characters" };
  }
  if (location.length > 120) {
    return { success: false, error: "Location must be ≤ 120 characters" };
  }
  if (availability.length > 160) {
    return { success: false, error: "Availability must be ≤ 160 characters" };
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      { name, headline, location, availability },
      { new: true }
    );
    return { success: true, message: "Basic info updated successfully" };
  } catch (err) {
    console.error("[updateBasicInfo]", err);
    return { success: false, error: "Failed to update basic info" };
  }
}

// ─── Update Bio ───────────────────────────────────────────────────────────────
export async function updateBio(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const bio = formData.get("bio")?.toString().trim() ?? "";

  if (bio.length > 600) {
    return { success: false, error: "Bio must be ≤ 600 characters" };
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      { bio },
      { new: true }
    );
    return { success: true, message: "Bio updated successfully" };
  } catch (err) {
    console.error("[updateBio]", err);
    return { success: false, error: "Failed to update bio" };
  }
}

// ─── Update Skills ────────────────────────────────────────────────────────────
export async function updateSkills(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const teachRaw = formData.get("teachSkills")?.toString() ?? "";
  const learnRaw = formData.get("learnSkills")?.toString() ?? "";

  const teachSkills = teachRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const learnSkills = learnRaw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  if (teachSkills.length > 20) {
    return { success: false, error: "Max 20 skills to teach" };
  }
  if (learnSkills.length > 20) {
    return { success: false, error: "Max 20 skills to learn" };
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      { teachSkills, learnSkills },
      { new: true }
    );
    return { success: true, message: "Skills updated successfully" };
  } catch (err) {
    console.error("[updateSkills]", err);
    return { success: false, error: "Failed to update skills" };
  }
}

// ─── Update Avatar URL ────────────────────────────────────────────────────────
export async function updateAvatar(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const rawImage = formData.get("image")?.toString() ?? "";
  const image = normalizeImageUrl(rawImage);

  if (rawImage.trim() && !image) {
    return { success: false, error: "Please enter a valid image URL" };
  }

  if (image.length > 2048) {
    return { success: false, error: "Image URL too long" };
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      { image: image || null },
      { new: true }
    );
    return { success: true, message: "Avatar updated successfully" };
  } catch (err) {
    console.error("[updateAvatar]", err);
    return { success: false, error: "Failed to update avatar" };
  }
}

export async function updateCoverImage(formData) {
  const session = await auth();
  if (!session?.user?.id) {
    return { success: false, error: "Not authenticated" };
  }

  const rawImage = formData.get("coverImage")?.toString() ?? "";
  const coverImage = normalizeImageUrl(rawImage);

  if (rawImage.trim() && !coverImage) {
    return { success: false, error: "Please enter a valid cover image URL" };
  }

  if (coverImage.length > 2048) {
    return { success: false, error: "Cover image URL too long" };
  }

  try {
    await connectToDatabase();
    await User.findByIdAndUpdate(
      session.user.id,
      { coverImage: coverImage || null },
      { new: true }
    );
    return { success: true, message: "Cover photo updated successfully" };
  } catch (err) {
    console.error("[updateCoverImage]", err);
    return { success: false, error: "Failed to update cover photo" };
  }
}

// ─── Delete Account ───────────────────────────────────────────────────────────
export async function deleteAccount() {
  const session = await auth();
  if (!session?.user?.email) {
    return { success: false, error: "Not authenticated" };
  }

  try {
    await connectToDatabase();
    await User.findOneAndDelete({ email: session.user.email });
    return { success: true, message: "Account deleted" };
  } catch (err) {
    console.error("[deleteAccount]", err);
    return { success: false, error: "Failed to delete account" };
  }
}
