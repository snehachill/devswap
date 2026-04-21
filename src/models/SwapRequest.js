import { Schema, model, models } from "mongoose";

const swapRequestSchema = new Schema(
  {
    requester: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    teachSkillOffered: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    learnSkillRequested: {
      type: String,
      required: true,
      trim: true,
      maxlength: 80,
    },
    status: {
      type: String,
      enum: ["pending", "active", "completed", "declined", "cancelled"],
      default: "pending",
      index: true,
    },
    message: {
      type: String,
      default: "",
      trim: true,
      maxlength: 300,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

swapRequestSchema.index({ requester: 1, receiver: 1, status: 1 });

export const SwapRequest =
  models.SwapRequest || model("SwapRequest", swapRequestSchema);
