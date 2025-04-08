import { ApiError } from "../utils/ApiError.js";
import { Instructor } from "../models/Course/InstructorSchema.js";
import { Course } from "../models/Course/CourseSchema.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Section } from "../models/Course/SectionSchema.js";
import { verifyEmail } from "../emails/VerifyEmail.js";

const options = {
  httpOnly: true,
  secure: true,
  sameSite: "None",
};

export const createCourse = asyncHandler(async (req, res) => {
  const { title, description, price, prerequisites, learnings } = req.body;

  let thumbnailUrl = "";
  if (req.file?.path) {
    const thumbnailLocalPath = req.file?.path;

    if (!thumbnailLocalPath) {
      throw new ApiError(400, "Thumbnail is required");
    }
    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    thumbnailUrl = thumbnail.url;
  }

  const course = await Course.create({
    title,
    description,
    price,
    prerequisites,
    learnings,
    thumbnail: thumbnailUrl,
    instructor: req.instructor?._id,
  });

  await course.save();

  return res
    .status(200)
    .json(new ApiResponse(200, course, "Course created successfully"));
});

export const createSection = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, videoTitles } = req.body;

  if (!videoTitles || !Array.isArray(videoTitles) || videoTitles.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one video title is required" });
  }

  if (!req.files || req.files.length === 0) {
    return res
      .status(400)
      .json({ error: "At least one video file is required" });
  }

  try {
    const videos = await Promise.all(
      videoTitles.map(async (videoTitle, index) => {
        let videoUrl = "";

        if (req.files[index]?.path) {
          const uploadedVideo = await uploadOnCloudinary(req.files[index].path);
          videoUrl = uploadedVideo.url;
        }

        return { title: videoTitle, lecture: videoUrl };
      })
    );

    // Create Section after all videos are uploaded
    const section = await Section.create({
      course: id, // Ensure id is cast correctly
      title,
      section: videos,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, section, "Section created successfully"));
  } catch (error) {
    console.error("Error creating section:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export const all = asyncHandler(async (req, res) => {
  try {
    const instructorId = req.instructor?._id;
    if (!instructorId) {
      return next(new ApiError(401, "Unauthorized"));
    }

    const courses = await Course.find({ instructor: instructorId });

    return res
      .status(200)
      .json(new ApiResponse(200, courses, "Fetched successfully"));
  } catch (error) {
    next(error);
  }
});

export const courseData = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Fetch course details along with instructor and sections
  const course = await Course.findById(id)
    .populate("instructor", "name email bio avatar experience degree") // Populating instructor details
    .lean(); // Converts Mongoose document to plain JS object

  if (!course) {
    return res.status(404).json(new ApiResponse(404, null, "Course not found"));
  }

  // Fetch related sections (if sections exist in your schema)
  const sections = await Section.find({ course: id }).lean();

  return res
    .status(200)
    .json(new ApiResponse(200, { course, sections }, "Success"));
});

export const addSection = asyncHandler(async (req, res) => {

  const {id} = req.params;
  const {title} = req.body;

  const section = await Section.create({
      course:id,
      title
  });

  await section.save();

  return res
    .status(200)
    .json(new ApiResponse(200, section, "section created"));
});

export const addLecture = asyncHandler(async(req,res)=>{
  const {title,sectionId} = req.body;


  let localPath = req.files[0].path;
  const uploadedVideo = await uploadOnCloudinary(localPath);


  let lecture = uploadedVideo?.url;
  
  const data = {title,lecture};

  const existedSection = await Section.findById({_id:sectionId});

  
  if (!existedSection) {
    return res.status(404).json({ message: "Section not found" });
  }

   existedSection.section.push(data);
   await existedSection.save();
      

   return res
      .status(200)
      .json(new ApiResponse(200, "", "Lecture has added successfully"));


})

export const detailsChange = asyncHandler(async (req, res) => {
   const {id} = req.params;
   const {title,price,description} = req.body;

   const course = await Course.findByIdAndUpdate({_id:id},{
    title,
    price,
    description
   }, { new: true, runValidators: true })

   await course.save();
 
  return res
    .status(200)
    .json(new ApiResponse(200, course, "Details changed"));
});

export const deleteSection = asyncHandler(async (req, res) => {

  const {sectionId} =  req.body;

  console.log("section delete",sectionId)

  const section = await Section.findByIdAndDelete(sectionId);

  return res
    .status(200)
    .json(new ApiResponse(200, "", "section Deleted"));
});



const generateAccessAndRefreshToken = async (instructorId) => {
  try {
    const instructor = await Instructor.findById(instructorId);

    const accessToken = instructor.generateAccessToken();
    const refreshToken = instructor.generateRefreshToken();

    instructor.refreshToken = refreshToken;
    await instructor.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
};

export const registerInstructor = async (req, res) => {
  const {
    fullName,
    email,
    mobile,
    dob,
    address,
    experience,
    degree,
    bio,
    password,
  } = req.body;

  console.log(req.body)

  if (
    [
      fullName,
      email,
      mobile,
      dob,
      address,
      experience,
      degree,
      bio,
      password,
    ].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await Instructor.findOne({
    $or: [{ mobile }, { email }],
  });

  if (existedUser) {
    if (!existedUser.isVerified) {
      await Instructor.findByIdAndDelete(existedUser._id);
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

  const avatarLocalPath = req.files?.avatar[0].path;

  // Check avatar exists or not

  if (!avatarLocalPath) {
    throw new ApiError(400, "avatar is required");
  }

  // upload on cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const instructor = await Instructor.create({
    name: fullName,
    email,
    password,
    bio,
    dob,
    address,
    experience,
    degree,
    mobile,
    avatar: avatar.url,
  });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await instructor.hashOtp(otp);
  await instructor.save();
  verifyEmail(email, otp);

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    instructor._id
  );

  // check avatar exists or not

  const createdInstructor = await Instructor.findById(instructor._id).select(
    "-password -refreshToken -createdAt -updatedAt -otpExpires -otp -isVerified"
  );

  if (!createdInstructor) throw new ApiError(500, "Something went wrong");

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(200, createdInstructor, "User registered successfully")
    );
};

export const otpCheck = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const instructor = await Instructor.findOne({ email });

    if (!instructor) {
      throw new ApiError(404, "instructor with email doesn't exists");
    }

    const isOtpValid = await instructor.isOtpCorrect(otp);

    if (!isOtpValid || instructor.otpExpires < Date.now()) {
      return res
        .status(400)
        .json(new ApiResponse(400, "", "Invalid or expired OTP"));
    }

    instructor.isVerified = true;
    await instructor.save();

    return res
      .status(200)
      .json(new ApiResponse(200, "", "Otp matched successfully"));
  } catch (error) {
    throw new ApiError(404, error);
  }
};

export const instructorData = asyncHandler(async (req, res) => {
  if (!req.instructor?.isVerified) {
    await Instructor.findByIdAndDelete(req.instructor?._id);

    return res
      .status(500)
      .json(new ApiResponse(500, "", "Email is not verified"));
  }

  return res.status(200).json(new ApiResponse(200, req.instructor, "Fetched"));
});

export const loginInstructor = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    throw new ApiError(400, "email is required");
  }

  const instructor = await Instructor.findOne({
    $or: [{ email }],
  });

  if (!instructor) {
    throw new ApiError(404, "instructor does not exist");
  }

  const isValid = await instructor.isPasswordCorrect(password);

  if (!isValid) {
    throw new ApiError(401, "Invalid instructor credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    instructor._id
  );


  const loggedInInstructor = await Instructor.findById(instructor._id).select(
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
          instructor: loggedInInstructor,
          accessToken,
          refreshToken,
        },
        "Instructor logged in successfully"
      )
    );
};

export const logoutInstructor = asyncHandler(async (req, res) => {
  await Instructor.findByIdAndUpdate(
    req.instructor._id,
    {
      $unset: {
        refreshToken: 1,
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
    .json(new ApiResponse(200, {}, "Instructor logged Out"));
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

    const instructor = await Instructor.findById(decodedToken?._id);

    if (!instructor) {
      throw new ApiError(401, "Invalid refresh token");
    }

    if (incomingRefreshToken !== instructor?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      instructor._id
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
