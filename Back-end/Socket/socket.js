import { createServer } from "http";
import { Server } from "socket.io";
import { Message } from "../models/Chat/message.model.js";
import { Conversation } from "../models/Chat/conversation.model.js";
import express from "express";
import dotenv from "dotenv";
import { User } from "../models/User/user.schema.js";
dotenv.config({
  path: "./.env",
});

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  },
});

const onlineUsers = {};

io.on("connection", (socket) => {
  // console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;

  socket.join(userId?.toString());

  if (userId) {
    onlineUsers[userId] = true;
    io.emit("online users", onlineUsers);
  }

  socket.on("chat", async (userData) => {

    try {
      const conversations = await Conversation.find({
        $or: [{ to: userData._id }, { from: userData._id }],
      })
        .populate({
          path: "to",
          select: "username fullName avatar lastSeen",
        })
        .populate({
          path: "from",
          select: "username fullName avatar lastSeen",
        })
        .populate("lastMessage");

        console.log(conversations);
 
      const populatedConversations = await Promise.all(
        conversations.map(async (conversation) => {
          const lastMessage = conversation.lastMessage
            ? await Message.findById(conversation.lastMessage)
            : null;

          const otherUserId = conversation?.to?._id.equals(userId)
            ? conversation.from._id
            : conversation.to._id;

          const unseenMessagesCount = await Message.countDocuments({
            conversationId: conversation._id,
            sender: otherUserId,
            seen: false,
          });

          return {
            ...conversation.toObject(),
            lastMessage: lastMessage
              ? {
                  content: lastMessage.content,
                  timestamp: lastMessage.timestamp,
                  seen: lastMessage.seen,
                  sender: lastMessage.sender,
                }
              : null,
            unseenMessages: unseenMessagesCount,
          };
        })
      );
    socket.emit("all-conversations", populatedConversations);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("conversation", async (id) => {
    const user = await User.findOne({ _id: id }).select(
      "username fullName avatar lastSeen"
    );

    if (!user) {
      // console.log("user doesn't exists");
    }

    socket.emit("message-user", user);

    let conversation = await Conversation.findOne({
      $or: [
        { to: userId, from: id },
        { to: id, from: userId },
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

    io.to(id).emit("message", { messages, conversation } || []);
    io.to(userId).emit("message", { messages, conversation } || []);
  });

  socket.on("new message", async ({ receiver, message, sender }) => {
    try {
      let conversation = await Conversation.findOne({
        $or: [
          { to: sender, from: receiver },
          { to: receiver, from: sender },
        ],
      });

      if(!conversation){
        conversation = new Conversation({
          from : sender,
          to : receiver,
        });
      }
      
      const newMessage = new Message({
        conversationId: conversation._id,
        sender: sender,
        content: message,
      });

      await newMessage.save();
      conversation.lastMessage = newMessage._id;
      await conversation.save();

      const messages = await Message.aggregate([
        {
          $match: { conversationId: conversation._id },
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
          },
        },
      ]);   

      io.to(receiver).emit("received message",{newMessage});
      io.to(sender).emit("received message",{newMessage});

      io.to(receiver).emit("message", { messages, conversation });
      io.to(sender).emit("message", { messages, conversation });
    } catch (error) {
      console.error("Error in new message handler:", error);
    }
  });

  socket.on("seen", async (id) => {
    try {
      let conversation = await Conversation.findOne({
        $or: [
          { to: id, from: userId },
          { to: userId, from: id },
        ],
      });

      if (!conversation) {
        return;
      }

      await Message.updateMany(
        {
          conversationId: conversation._id,
          sender: id,
          seen: false,
        },
        { $set: { seen: true } }
      );

      const updatedMessages = await Message.aggregate([
        {
          $match: { conversationId: conversation._id },
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
          },
        },
      ]);

      io.to(id).emit("message", updatedMessages);
      io.to(userId).emit("message", updatedMessages);
      io.to(userId).emit("seen",updatedMessages);
    } catch (error) {
      console.error("Error in seen handler:", error);
    }
  });

  socket.on("typing", (data) => {
    socket.to(data.receiver).emit("typing", { sender: data.sender });
  });

  socket.on("stop typing", (data) => {
    socket.to(data.receiver).emit("stop typing", { sender: data.sender });
  });

  socket.on("disconnect", () => {
    // console.log("A user disconnected");
    if (userId) {
      delete onlineUsers[userId];
      io.emit("online users", onlineUsers);
    }
  });
});

export { app, server };
