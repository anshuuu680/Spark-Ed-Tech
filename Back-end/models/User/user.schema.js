import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },


    pronouns: {
      type: String,
      default:""
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    mobile: {
      type: String,
      default:""
    },

    avatar: {
      type: String,
      default:""
    },

    address: {
      type: String,
      default:""
    },

    isVerified:{
      type:Boolean,
      default:false
    },

    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],

    savedQuestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],

    otp: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.hashOtp = async function (otp) {
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(otp, salt);
  this.otpExpires = Date.now() + 10 * 60 * 1000;
};

userSchema.methods.isOtpCorrect = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const User = mongoose.model("User", userSchema);
