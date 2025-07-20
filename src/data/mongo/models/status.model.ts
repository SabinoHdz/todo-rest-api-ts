import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: true,
  },
  color: {
    type: String,
    default: "#ccc",
  },
});

export const StatusModel = mongoose.model("Status", statusSchema);
