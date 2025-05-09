import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User/user.schema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

import { forgotPassword } from "../emails/ForgotPassword.js";
import { Post } from "../models/Post/post.model.js";
import { Question } from "../models/Post/question.model.js";
import { verifyEmail } from "../emails/VerifyEmail.js";

const options = {
  httpOnly: true,
  secure: false,
  sameSite: "None",
  path: '/',
};


export async function findAndUpdateUser(query, update, options = {}) {
  return User.findOneAndUpdate(query, update, options);
}

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error:", error);
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, fullName, password } = req.body;

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      if (!existedUser.isVerified) {
        await User.findByIdAndDelete(existedUser._id);
      } else {
        return res
          .status(409)
          .json(
            new ApiResponse(
              409,
              null,
              "User with username or email already exists and is verified"
            )
          );
      }
    }

    const user = await User.create({
      username,
      email,
      fullName,
      password,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await user.hashOtp(otp);
    await user.save();
    verifyEmail(email, otp);

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user?._id
    );

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -createdAt -updatedAt -otpExpires -otp -isVerified"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
    }

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, createdUser, "User registered successfully"));
  } catch (error) {
    console.error("Error registering user:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal server error"));
  }
};

export const loginUser = async (req, res) => {
  const { username, email, password } = req.body;




  if (!(username || email)) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Username or email is required"));
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "User does not exist"));
    }

    const isValid = await user.isPasswordCorrect(password);

    if (!isValid) {
      return res
        .status(401)
        .json(new ApiResponse(401, null, "Invalid user credentials"));
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );



    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "User logged in successfully"
        )
      );
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export const logoutUser = asyncHandler(async (req, res) => {
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
    .json(new ApiResponse(200, {}, "User logged Out"));
});

export const refreshAccessToken = async (req, res) => {
  const incomingRefreshToken = eq.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = Jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
};

export const forgotOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await user.hashOtp(otp);
  forgotPassword(email, otp);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "", "Otp saved successfully"));
};

export const otpCheck = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      throw new ApiError(404, "User with email doesn't exists");
    }

    const isOtpValid = await user.isOtpCorrect(otp);

    if (!isOtpValid || user.otpExpires < Date.now()) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Invalid or expired OTP"));
    }

    user.isVerified = true;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "", "Otp matched successfully"));
  } catch (error) {
    throw new ApiError(404, error);
  }
};

export const resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    user.otp = undefined;
    user.otpExpires = undefined;

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      user._id
    );

    await user.save();

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedInUser,
            accessToken,
            refreshToken,
          },
          "Password reset successfully"
        )
      );
  } catch (error) {}
};

export const getCurrentUser = asyncHandler(async (req, res) => {
  if (!req.user?.isVerified) {
    await User.findByIdAndDelete(req.user._id);

    return res
      .status(500)
      .json(new ApiResponse(500, "", "Email is not verified"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

export const updateUser = asyncHandler(async (req, res) => {
  const { email, fullName, dob, pronouns, mobile, address, bio } = req.body;

  let avatarUrl = "";
  if (req.file?.path) {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar is required");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    avatarUrl = avatar.url;
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      email,
      fullName,
      dob,
      bio,
      pronouns,
      mobile,
      address,
      ...(avatarUrl && { avatar: avatarUrl }),
    },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Updated successfully"));
});

export const allUsers = asyncHandler(async (req, res) => {
  try {


    // Find all users except the current user
    const users = await User.find(
      { _id: { $ne: req.user?._id } }, // Exclude current user by _id
      "username fullName avatar lastSeen" // Select specific fields
    );

    return res
      .status(200)
      .json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export const userDetails = asyncHandler(async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username }).select(
    "username fullName avatar bio"
  );

  const postCount = await Post.countDocuments({ postedBy: user?._id });
  const questionCount = await Question.countDocuments({ postedBy: user?._id });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user, postCount, questionCount },
        "User fetched successfully"
      )
    );
});

export const savedPosts = asyncHandler(async (req, res) => {
  const { _id, type } = req.body.data;
  const userId = req.user?._id;

  let saved;

  const user = await User.findById(userId);

  if (type === "post") {
    if (user.savedPosts?.includes(_id)) {
      saved = false;
      user.savedPosts = user.savedPosts.filter((item) => item != _id);
    } else {
      saved = true;
      user.savedPosts = [...user.savedPosts, _id];
    }
  } else {
    if (user.savedQuestions?.includes(_id)) {
      saved = false;
      user.savedQuestions = user.savedQuestions.filter((item) => item != _id);
    } else {
      saved = true;
      user.savedQuestions = [...user.savedQuestions, _id];
    }
  }
  await user.save();

  res.status(200).json(new ApiResponse(200, { saved, user }, "Successful"));
});
