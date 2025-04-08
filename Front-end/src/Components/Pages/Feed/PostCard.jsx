import { useState } from "react";
import Navbar from "./Navbar";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";

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
    setIsLiked((prevIsLiked) => !prevIsLiked);
    await axios.post('https://spark-ed-tech.onrender.com/api/feed/like', { _id, type, userId });
  };

  return (
    <div className="max-w-2xl p-4 sm:p-6 rounded-2xl shadow-lg bg-gray-100 dark:bg-gray-800 transition-all">
      <Navbar user={postedBy} time={timeDifference} data={obj} />

      <div onClick={handleClick} className="cursor-pointer">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        <div className="w-full aspect-[4/3] flex items-center justify-center mt-3 rounded-2xl overflow-hidden border border-gray-300 dark:border-gray-600">
          <img className="w-full h-full object-cover rounded-2xl" src={imageUrl} alt={title} />
        </div>
      </div>

      <div className="flex h-fit items-center justify-start gap-6 mt-4">
        {/* Like Button */}
        <div
          onClick={handleLike}
          className="flex items-center gap-1 cursor-pointer text-gray-900 dark:text-gray-100 hover:text-blue-500 transition-all"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 22 22"
            fill={isLiked ? 'green' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
          >
            <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
          </svg>
        </div>

      
      </div>

      {/* Comment Modal */}
      {isCommentOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="dark:text-white bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-lg font-semibold text-center">Add a Comment</h2>
            <textarea
              className="w-full mt-3 p-3 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 focus:ring-blue-600 focus:border-blue-600"
              placeholder="Write your comment..."
            />
            <div className="flex justify-end mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                onClick={() => setIsCommentOpen(false)}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
