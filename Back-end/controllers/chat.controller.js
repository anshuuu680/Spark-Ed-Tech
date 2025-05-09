import { asyncHandler } from "../utils/asyncHandler.js";
import { Conversation } from "../models/Chat/conversation.model.js";
import { Message } from "../models/Chat/message.model.js";
import { User } from "../models/User/user.schema.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const privateChat = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;
    const userId = req.user._id;

    const user = await User.findOne({ _id }).select(
      "username fullName avatar lastSeen"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let conversation = await Conversation.findOne({
      $or: [
        { to: userId, from: _id },
        { to: _id, from: userId },
      ],
    }).populate("to from lastMessage");

    const messages = await Message.aggregate([
      {
        $match: { conversationId: conversation?._id },
      },
      { $sort: { timestamp: 1 } },
      {
        $lookup: {
          from: "users",
          localField: "sender",
          foreignField: "_id",
          as: "sender",
        },
      },
      { $unwind: "$sender" },
      {
        $project: {
          _id: 1,
          content: 1,
          timestamp: 1,
          seen: 1,
          "sender._id": 1,
          "sender.username": 1,
          "sender.fullName": 1,
          "sender.avatar": 1,
          "sender.createdAt": 1,
          "sender.updatedAt": 1,
        },
      },
    ]);

    res
      .status(200)
      .json(
        new ApiResponse(200, { user, messages }, "Chat fetched successfully")
      );
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export const startChat = asyncHandler(async (req, res) => {
 try {
  const { id } = req.params;

  console.log("start",id);

  const existing = await Conversation.findOne({ to: id });

  if (existing) {
    res.status(200).json(new ApiResponse(200, _, "Already exists"));
  }

  const conversation = await Conversation.create({
    to: id,
    from: req.user?._id,
  });

  await conversation.save();


    res
    .status(200)
    .json(new ApiResponse(200,conversation,"Conversation created"));


  
 } catch (error) {
  console.log(error.message);
 }




});
