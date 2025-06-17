import { useState } from "react";
import Navbar from "./Navbar";
import { formatDistanceToNow } from "date-fns";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import { motion } from "framer-motion";

const PostCard = ({ obj }) => {
  const { postedBy, imageUrl, description, title, _id, createdAt, type, likes } = obj;
  const [isLiked, setIsLiked] = useState(obj?.isLiked);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const navigate = useNavigate();
  const { userData } = useSelector(selectUserData);
  const userId = userData?._id;

  const timeDifference = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  const handleClick = () => {
    navigate(`/users/feed/post=${_id}&type=${type}`);
  };

  const handleLike = async () => {
    setIsLiked((prev) => !prev);
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/feed/like`,
      { _id, type, userId },
      { withCredentials: true }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-2xl w-full p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-lg transition-all"
    >
      <Navbar user={postedBy} time={timeDifference} data={obj} />

      <div onClick={handleClick} className="cursor-pointer">
        <h1 className="text-lg font-semibold text-white mt-2">{title}</h1>
        <p className="text-sm text-gray-300 mt-1">{description}</p>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="mt-3 rounded-lg border border-white/10 overflow-hidden bg-gradient-to-br from-black/10 to-black/30"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full  h-auto min-h-[250px] max-h-[500px] object-cover rounded-lg transition-transform duration-300"
            onError={(e) => {
              e.target.style.objectFit = 'contain';
              e.target.style.backgroundColor = '#1a1a1a';
            }}
          />
        </motion.div>
      </div>

      <div className="flex items-center justify-start gap-4 mt-3 text-white text-sm">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center gap-1 cursor-pointer hover:text-pink-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "red" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 3a5.75 5.75 0 0 1 4.25 9.68l-7.5 8.07a.75.75 0 0 1-1.08 0l-7.5-8.07A5.75 5.75 0 1 1 16.5 3z"
            />
          </svg>
          <span>{likes?.length || 0}</span>
        </motion.div>

        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCommentOpen(true)}
          className="hover:text-blue-400 cursor-pointer"
        >
          💬 Comment
        </motion.div>
      </div>

      {isCommentOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/10 border border-white/20 backdrop-blur-md text-white p-5 rounded-xl w-full max-w-sm"
          >
            <h2 className="text-base font-medium text-center">Add a Comment</h2>
            <textarea
              className="w-full mt-3 p-2 rounded border border-white/20 bg-white/5 text-white placeholder-gray-400 focus:ring-blue-500"
              placeholder="Write your comment..."
              rows="3"
            />
            <div className="flex justify-end mt-3 gap-2 text-sm">
              <button
                onClick={() => setIsCommentOpen(false)}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded hover:bg-white/20"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsCommentOpen(false)}
                className="px-3 py-1 bg-blue-600 rounded hover:bg-blue-500"
              >
                Add
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default PostCard;