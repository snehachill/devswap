import { Schema, model, models } from "mongoose";

const chatMessageSchema = new Schema(
  {
    request: {
      type: Schema.Types.ObjectId,
      ref: "SwapRequest",
      required: true,
      index: true,
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    readBy: {
      type: [Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

chatMessageSchema.index({ request: 1, createdAt: 1 });

export const ChatMessage =
  models.ChatMessage || model("ChatMessage", chatMessageSchema);
