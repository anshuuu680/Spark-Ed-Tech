import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
    },

    description: {
      type: String,
    },

    prerequisites: [
      {
        type: String,
      },
    ],

    learnings: [
      {
        type: String,
      },
    ],

    thumbnail: {
      type: String,
    },

    instructor: {
      type: Schema.Types.ObjectId,
      ref: "Instructor",
    },

    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
