import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const instructorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    mobile: {
      type: String,
      required: true,
      unique: true,
    },

    avatar: {
      type: String,
    },

    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
    },
    address: {
      type: String,
    },
    experience: {
      type: String,
    },

    degree: {
      type: String,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
    },

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

instructorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

instructorSchema.methods.hashOtp = async function (otp) {
  const salt = await bcrypt.genSalt(10);
  this.otp = await bcrypt.hash(otp, salt);
  this.otpExpires = Date.now() + 10 * 60 * 1000;
};

instructorSchema.methods.isOtpCorrect = async function (enteredOtp) {
  return await bcrypt.compare(enteredOtp, this.otp);
};

instructorSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

instructorSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};

instructorSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  );
};

export const Instructor = mongoose.model("Instructor", instructorSchema);
