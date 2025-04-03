import mongoose, { Schema } from "mongoose";
const likeSchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      refPath: "itemType",
    },
    itemType: {
      type: String,
      enum: ["post", "poll", "question", "comment"],
    },
    likedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
