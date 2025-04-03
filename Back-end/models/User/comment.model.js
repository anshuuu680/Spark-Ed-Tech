import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    item: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "itemType",
    },
    itemType: {
      type: String,
      enum: ["post", "poll", "question"],
    },

    owner: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    comments: [
      {
        content: {
          type: String,
          required: true,
        },
        owner: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
      },
    ],

    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Like" }],
  },
  {
    timestamps: true,
  }
);

commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);
