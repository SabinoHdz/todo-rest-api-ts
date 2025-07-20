import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
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
export const TagModel = mongoose.model("Tag", tagSchema);
