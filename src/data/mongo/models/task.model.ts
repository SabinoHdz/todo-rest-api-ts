import mongoose, { Types } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    status: {
      type: Types.ObjectId,
      ref: "Status",
      required: true,
    },
    priority: { type: Types.ObjectId, ref: "Priority", required: true },
    tags: [{ type: Types.ObjectId, ref: "Tag" }],
    dueDate: { type: Date },
    history: [
      {
        change: String,
        changeAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model("Task", taskSchema);
