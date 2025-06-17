import { useState } from "react";
import Navbar from "./Navbar";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import { motion } from "framer-motion";

const QuestionCard = ({ obj }) => {
  const { postedBy, question, _id, createdAt, type, likes } = obj;
  const timeDifference = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const [isLiked, setIsLiked] = useState(obj?.isLiked);
  const [allLikes, setAllLikes] = useState();

  const navigate = useNavigate();
  const { userData } = useSelector(selectUserData);
  const userId = userData?._id;

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/feed/like`,
      { _id, type, userId },
      { withCredentials: true }
    );
    setAllLikes(response?.data.data);
  };

  const handleClick = () => {
    navigate(`/users/feed/post=${_id}&type=${type}`);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md p-4 rounded-xl border border-white/10 backdrop-blur-md shadow-md transition-all"
    >
      <Navbar user={postedBy} time={timeDifference} data={obj} />

      <div onClick={handleClick} className="cursor-pointer mt-2">
        <h1 className="text-base sm:text-lg font-medium text-white">
          {question}
        </h1>
      </div>

      <div className="flex items-center justify-start gap-4 mt-4 text-white text-sm">
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={handleLike}
          className="flex items-center gap-1 cursor-pointer hover:text-green-400 transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isLiked ? "green" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
            className="w-5 h-5"
          >
            <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14" />
          </svg>
          <span>{allLikes?.length || likes?.length || 0}</span>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default QuestionCard;
