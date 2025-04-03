import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Course } from "../models/Course/CourseSchema.js";
import { razorpayInstance } from "../config/payment.config.js";
import crypto from "crypto";
import { Subscription } from "../models/Course/SubscriptionSchema.js";

const razor = razorpayInstance();

export const createOrder = asyncHandler(async (req, res) => {
  const { id } = req.body;

  const course = await Course.findById(id);


  //create am order

  const options = {
    amount: course.price * 100,
    currency: "INR",
    receipt: `receipt_order_1`,
  };

  try {
    razor.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Payment failed",
        });
      }

      res.status(200).json(new ApiResponse(200, order, "created"));
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Payment failed",
    });
  }
});

export const verifyPayment = asyncHandler(async (req, res) => {
  const { order_id, payment_id, signature, course_id } = req.body;

  const secret = process.env.RAZORPAY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);

  hmac.update(order_id + "|" + payment_id);

  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    const subscription = await Subscription.create({
      subscriber: req.user?._id,
      course: course_id,
    });

    await subscription.save();
    
    return res
      .status(200)
      .json(new ApiResponse(200, subscription, "Successful"));
  } else {
    return res.status(400).json(new ApiResponse(400, false, "Failed"));
  }
});
