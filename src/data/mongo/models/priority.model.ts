import mongoose from "mongoose";

const prioritySchema = new mongoose.Schema({
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

export const PriorityModel = mongoose.model("Priority", prioritySchema);
