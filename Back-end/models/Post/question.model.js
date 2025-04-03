import mongoose, { Schema } from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      default: "question",
    },

    question: {
      type: String,
    },

   
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", questionSchema);
