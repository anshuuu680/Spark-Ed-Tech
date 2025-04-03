import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  
    tasks: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        isCompleted: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
