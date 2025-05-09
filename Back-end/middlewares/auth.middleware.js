import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User/user.schema.js";
import { Instructor } from "../models/Course/InstructorSchema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
      
    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }


    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});

export const verifyInstructorJWT = async (req, res, next) => {
  try {

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace(/Bearer /i, "");

      console.log(token);

    if (!token) {
      console.log("No token provided");
      return next(new ApiError(401, "Unauthorized request"));
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const instructor = await Instructor.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!instructor) {
      console.log("Instructor not found");
      return next(new ApiError(401, "Invalid access token"));
    }

    req.instructor = instructor;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error);
    next(new ApiError(401, "Invalid access token"));
  }
};






export const verifyAdminJWT = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Unauthorized" });
  }
};
