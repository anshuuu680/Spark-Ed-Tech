import mongoose,{Schema} from "mongoose";

const regularPostSchema = new mongoose.Schema(
  {
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    type:{
      type:String,
      default:'post'
    },

    title: {
      type: String,
    },

    description: {
      type: String,
    },

    imageUrl: 
      {
        type: String,
      },

     
  },
  
  { timestamps: true }
);

export const Post = mongoose.model("Post", regularPostSchema);
