import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/User/user.schema.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const options = {
    httpOnly: true,
    secure: true,
  };
  

export const getAdminData = async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "Admin fetched successfully"));
};

export const adminAuth = (req,res) => {
  res
  .status(200)
  .json(new ApiResponse(200,req.user,"Admin data"));
};

export const logoutAdmin = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged Out"));
});
