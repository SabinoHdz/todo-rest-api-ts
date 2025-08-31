import mongoose from "mongoose";

const userprofileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bio: { type: String, default: "" },
  avatarUrl: { type: String, default: "" },
  website: { type: String, default: "" },
  location: { type: String, default: "" },
  socialLinks: {
    twitter: { type: String, default: "" },
    facebook: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
  },
  preferences: {
    theme: {
      type: String,
      enum: ["light", "dark", "system"],
      default: "system",
    },
    notifications: { type: Boolean, default: true },
    langueage: { type: String, default: "es" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserProfileModel = mongoose.model(
  "UserProfile",
  userprofileSchema
);
