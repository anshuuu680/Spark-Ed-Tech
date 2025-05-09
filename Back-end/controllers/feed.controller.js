import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Post } from "../models/Post/post.model.js";
import { Question } from "../models/Post/question.model.js";
import { Like } from "../models/User/like.model.js";
import { Comment } from "../models/User/comment.model.js";
import { User } from "../models/User/user.schema.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";

export const createPost = async (req, res) => {
 try {
  const { title, description } = req.body;
  const postImageLocalPath = req.file?.path;


  console.log(title,description);

  if (!postImageLocalPath) {
    throw new ApiError(400, "Image is required");
  }

  const postImage = await uploadOnCloudinary(postImageLocalPath);

  const newPost = await Post.create({
    postedBy: req.user._id,
    title: title,
    description: description,
    ...(postImage && postImage.url && { imageUrl: postImage.url }),
  });

  res
    .status(200)
    .json(new ApiResponse(200, newPost, "Post uploaded successfully"));


 } catch (error) {
  console.log(error.message);
 }

  };

export const createQuestion = async (req, res) => {
  const { question } = req.body;

  if (question) {
    const newQuestion = Question.create({
      postedBy: req.user._id,
      question: question,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, newQuestion, "Question created"));
  }
};

export const getPosts = async (req, res) => {
  const page = 1;
  const userId = req.user?._id;

  const feed = await Promise.all([
    Post.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (page - 1) * 5,
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "item",
          as: "likes",
        },
      },
      {
        $addFields: {
          isLiked: {
            $in: [new mongoose.Types.ObjectId(userId), "$likes.likedBy"],
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "item",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      {
        $unwind: "$postedBy",
      },
      {
        $project: {
          postedBy: {
            _id: "$postedBy._id",
            username: "$postedBy.username",
            avatar: "$postedBy.avatar",
          },
          _id: 1,
          type: 1,
          title: 1,
          description: 1,
          imageUrl: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: {
                user_id: "$$like.user_id",
                timestamp: "$$like.timestamp",
              },
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                user_id: "$$comment.user_id",
                content: "$$comment.content",
                timestamp: "$$comment.timestamp",
              },
            },
          },
          isLiked: 1,
        },
      },
    ]).exec(),

    Question.aggregate([
      {
        $sort: { createdAt: -1 },
      },
      {
        $skip: (page - 1) * 5,
      },
      {
        $limit: 5,
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "item",
          as: "likes",
        },
      },
      {
        $addFields: {
          isLiked: {
            $in: [new mongoose.Types.ObjectId(userId), "$likes.likedBy"],
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "item",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      {
        $unwind: "$postedBy",
      },
      {
        $project: {
          postedBy: {
            _id: "$postedBy._id",
            username: "$postedBy.username",
            avatar: "$postedBy.avatar",
          },
          _id: 1,
          type: 1,
          question: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: {
                user_id: "$$like.user_id",
                timestamp: "$$like.timestamp",
              },
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                user_id: "$$comment.user_id",
                content: "$$comment.content",
                timestamp: "$$comment.timestamp",
              },
            },
          },
          isLiked: 1, // Include the new field in the output
        },
      },
    ]).exec(),
  ]);



  const flattenedFeed = feed.flat();
  const sortedFeed = flattenedFeed.sort((a, b) => b.createdAt - a.createdAt);

  const postCount = await Post.countDocuments({ postedBy: userId });
  const questionCount = await Question.countDocuments({ postedBy: userId });

  res.status(200).json(new ApiResponse(200, {sortedFeed,postCount,questionCount}, "successful"));
};

export const handleLike = async (req, res) => {
  try {
    const { _id, type, userId } = req.body;

    const existingLike = await Like.findOne({
      item: _id,
      itemType: type,
      likedBy: userId,
    });

    if (existingLike) {
      await Like.findByIdAndDelete(existingLike._id);
      const totalLikes = await Like.find({ item: _id, itemType: type });
      res
        .status(200)
        .json(new ApiResponse(200, totalLikes.length, "Disliked successfully"));
    } else {
      const newLike = await Like.create({
        item: _id,
        itemType: type,
        likedBy: userId,
      });
      const totalLikes = await Like.find({ item: _id, itemType: type });

      res
        .status(200)
        .json(new ApiResponse(200, totalLikes.length, "Liked successfully"));
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json(new ApiResponse(500, "", "Internal error"));
  }
};

export const checkLike = async (req, res) => {
  try {
    const { _id, type, userId } = req.body;

    console.log("checkinhg")

    const existingLike = await Like.findOne({
      item: _id,
      itemType: type,
      likedBy: userId,
    });
    if (existingLike) {
      res.status(200).json(new ApiResponse(200, true, ""));
    } else {
      res.status(500).json(new ApiResponse(500, CSSFontFeatureValuesRule, ""));
    }
  } catch (error) {}
};

export const getPostData = async (req, res) => {
  try {
    const postId = req.query.id;
    const type = req.query.type;

    let result;

    if (type === "post") {
      result = await Post.findOne({ _id: postId }).populate({
        path: "postedBy",
        select: "username avatar _id",
      });
    } else if (type === "question") {
      result = await Question.findOne({ _id: postId }).populate({
        path: "postedBy",
        select: "username avatar _id",
      });
    } else {
      return res.status(400).json({ error: "Invalid type" });
    }

    const existingLike = await Like.findOne({
      item: postId,
      itemType: type,
      likedBy: req.user?._id,
    });



    const comments = await Comment.find({
      item: postId,
      itemType: type,
    }).populate({
      path: "owner",
      select: "-password -email -role -mobile -refreshToken -updatedAt",
    }).sort({ createdAt: -1 });

    const commentsWithLikes = await Promise.all(
      comments.map(async (comment) => {
        const likes = await Like.find({
          item: comment._id,
          itemType: "comment",
        });

        const isLiked = likes.some(
          (like) => like.likedBy.toString() == req.user?._id
        );


        return { ...comment.toObject(), likes, isLiked };
      })
    );

    const totalLikes = await Like.find({ item: postId, itemType: type });


    res.status(200).json(
      new ApiResponse(
        200,
        {
          result,
          existingLike,
          totalLikes,
          commentsWithLikes,
        },
        "Data fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const { _id, value, type } = req.body;

    if (value.length) {
      const newComment = await Comment.create({
        content: value,
        item: _id,
        itemType: type,
        owner: req.user._id,
        comments: [],
      });

      const comments = await Comment.find({
        item: _id,
        itemType: type,
      }).populate({
        path: "owner",
        select: "username fullName avatar",
      }).sort({ createdAt: -1 }); ;
      res.status(200).json(new ApiResponse(200, comments, "Comment added"));
    } else {
      res
        .status(400)
        .json(
          new ApiResponse(
            400,
            "",
            "Some required details are missing or incorrect. Please provide all necessary information."
          )
        );
    }
  } catch (error) {
    res.status(404).json(new ApiResponse(404, "", "Internal server error"));
  }
};

export const commentLikes = async (req, res) => {
  const { _id, type } = req.body;
  try {
    const likes = await Like.find({ item: _id, type });
    res.status(200).json(new ApiResponse(200, likes, "SuccessFully fetched"));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const username = req.params.username;
    const userId = req.user?._id;


    // Find the user by username and exclude certain fields
    const user = await User.findOne({ username }).select(
      "-password -refreshToken -email -mobile -role -dob"
    );

    // If user is not found, return 404 and stop execution
    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, "", "Something went wrong"));
    }

    // Perform the aggregation query to fetch posts
    const posts = await Post.aggregate([
      {
        $match: {
          postedBy: user._id, // Match posts by the user
        },
      },
      {
        $sort: { createdAt: -1 }, // Sort posts by creation date
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "item",
          as: "likes",
        },
      },
      {
        $addFields: {
          isLiked: {
            $in: [new mongoose.Types.ObjectId(userId), "$likes.likedBy"],
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "item",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      {
        $unwind: "$postedBy",
      },
      {
        $project: {
          postedBy: {
            _id: "$postedBy._id",
            username: "$postedBy.username",
            avatar: "$postedBy.avatar",
          },
          _id: 1,
          type: 1,
          title: 1,
          description: 1,
          imageUrl: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: {
                user_id: "$$like.user_id",
                timestamp: "$$like.timestamp",
              },
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                user_id: "$$comment.user_id",
                content: "$$comment.content",
                timestamp: "$$comment.timestamp",
              },
            },
          },
          isLiked: 1,
        },
      },
    ]).exec();


    // No need to flatten or re-sort posts, as they are already sorted
    res
      .status(200)
      .json(new ApiResponse(200, { user, posts }, "Successfully fetched"));
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserQuestions = async (req, res) => {
  try {
    const username = req.params.username;
    const userId = req.user?._id;

    const user = await User.findOne({ username }).select(
      "-password -refreshToken -email -mobile -role -dob"
    );

    if (!user) {
      return res
        .status(404)
        .json(new ApiResponse(404, "", "Something went wrong"));
    }

    const questions = await Question.aggregate([
      {
        $match: {
          postedBy: user._id, 
        },
      },
      {
        $sort: { createdAt: -1 }, 
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "item",
          as: "likes",
        },
      },
      {
        $addFields: {
          isLiked: {
            $in: [new mongoose.Types.ObjectId(userId), "$likes.likedBy"],
          },
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "item",
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "postedBy",
          foreignField: "_id",
          as: "postedBy",
        },
      },
      {
        $unwind: "$postedBy",
      },
      {
        $project: {
          postedBy: {
            _id: "$postedBy._id",
            username: "$postedBy.username",
            avatar: "$postedBy.avatar",
          },
          _id: 1,
          type: 1,
          question: 1,
          createdAt: 1,
          likes: {
            $map: {
              input: "$likes",
              as: "like",
              in: {
                user_id: "$$like.user_id",
                timestamp: "$$like.timestamp",
              },
            },
          },
          comments: {
            $map: {
              input: "$comments",
              as: "comment",
              in: {
                user_id: "$$comment.user_id",
                content: "$$comment.content",
                timestamp: "$$comment.timestamp",
              },
            },
          },
          isLiked: 1, // Include the isLiked field in the output
        },
      },
    ]).exec();



    res
      .status(200)
      .json(new ApiResponse(200, { user, questions }, "Successfully fetched"));
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
