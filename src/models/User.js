import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 255,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 60,
      maxlength: 255,
      select: false,
    },
    image: {
      type: String,
      default: null,
      trim: true,
      maxlength: 2048,
    },
    headline: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
      maxlength: 600,
    },
    location: {
      type: String,
      default: "",
      trim: true,
      maxlength: 120,
    },
    teachSkills: {
      type: [String],
      default: [],
    },
    learnSkills: {
      type: [String],
      default: [],
    },
    availability: {
      type: String,
      default: "",
      trim: true,
      maxlength: 160,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = models.User || model("User", userSchema);
