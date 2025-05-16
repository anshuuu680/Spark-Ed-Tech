import mongoose from "mongoose";
import { Course } from "../models/Course/CourseSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Subscription } from "../models/Course/SubscriptionSchema.js";

export const getAllCourses = async (req, res) => {
  const courses = await Course.find().populate("instructor", "name avatar");
  res.status(200).json(new ApiResponse(200, courses, "Successful"));
};

export const courseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.query.userId;
   


    const courseDetails = await Course.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, 
      {
        $lookup: {
          from: "instructors",
          localField: "instructor",
          foreignField: "_id",
          as: "instructorDetails",
        },
      },
      { $unwind: "$instructorDetails" }, 
      {
        $lookup: {
          from: "sections", 
          localField: "_id",
          foreignField: "course",
          as: "sections",
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          price: 1,
          thumbnail: 1,
          learnings: 1,
          prerequisites: 1,

          "instructorDetails.name": 1,
          "instructorDetails.avatar": 1,
          "instructorDetails.bio": 1,
          sections: 1, 
        },
      },
    ]);





    const cours = await Subscription.findOne({
      subscriber: userId,
      course: id,
    }) ?? null;


   




    if (!courseDetails.length) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Course not found"));
    }

    res.status(200).json(new ApiResponse(200, {course:courseDetails[0],cours}, "Successful"));
  } catch (error) {
    res.status(500).json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const myCourses = async (req, res) => {
  const courses = await Subscription.find({
    subscriber: req.user?._id,
  })
    .populate({
      path: "course",
      populate: {
        path: "instructor",
        select: "name avatar",
      },
    });
  
  res.status(200).json(new ApiResponse(200, courses, "Successful"));
};
