import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema({

  course: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },

  title:{
    type:String,
  },

  section:[{
    title:{
      type:String
    },
    lecture:{
      type:String,
    },
  }]

  
},{timestamps:true});

export const Section = mongoose.model("Section", sectionSchema);
