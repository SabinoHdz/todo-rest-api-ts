import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },

  password: { type: String, required: true },
  image: { type: String },
  roles: {
    type: [String],
    enum: ["user", "admin", "superadmin"],
    default: ["user"],
  },
  isActive: { type: Boolean, default: true },
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const UserModel = mongoose.model("User", userSchema);
