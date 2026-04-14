"use server"; // Must be at the very top

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { connectToDatabase } from "@/src/lib/mongoose";
import { User } from "@/src/models/User";
import bcrypt from "bcryptjs";

export async function registerUser(_previousState, formData) {
  // Extract email here so it's defined for the rest of the function!
  const email = formData.get("email")?.toString().toLowerCase().trim(); 
  const name = formData.get("name")?.toString().trim();
  const password = formData.get("password")?.toString();
  const image = formData.get("image")?.toString().trim() || null;

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  if (!name) {
    return { error: "Name is required." };
  }

  try {
    await connectToDatabase();

    // Now 'email' is defined, so this won't crash anymore!
    const existingUser = await User.findOne({ email }).lean();
    
    if (existingUser) {
      return { error: "User already exists." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      name,
      email,
      password: hashedPassword,
      image,
      headline: "Open to skill swaps",
      bio: "",
      location: "",
      teachSkills: [],
      learnSkills: [],
      availability: "",
    });

    return { success: "Account created! You can now sign in." };
  } catch (err) {
    console.error(err);
    return { error: "Database connection failed." };
  }
}

function parseSkillList(value) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 12);
}

export async function updateDashboardProfile(_previousState, formData) {
  const session = await auth();

  if (!session?.user?.id) {
    return { error: "Please sign in to update your dashboard." };
  }

  const name = formData.get("name")?.toString().trim() ?? "";
  const headline = formData.get("headline")?.toString().trim() ?? "";
  const location = formData.get("location")?.toString().trim() ?? "";
  const availability = formData.get("availability")?.toString().trim() ?? "";
  const image = formData.get("image")?.toString().trim() ?? "";
  const bio = formData.get("bio")?.toString().trim() ?? "";
  const teachSkills = parseSkillList(formData.get("teachSkills")?.toString() ?? "");
  const learnSkills = parseSkillList(formData.get("learnSkills")?.toString() ?? "");

  if (!name) {
    return { error: "Name is required." };
  }

  try {
    await connectToDatabase();

    await User.findByIdAndUpdate(session.user.id, {
      name,
      headline,
      location,
      availability,
      image: image || null,
      bio,
      teachSkills,
      learnSkills,
    });

    revalidatePath("/user/dashboard");

    return { success: "Dashboard updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "Unable to update your dashboard right now." };
  }
}
