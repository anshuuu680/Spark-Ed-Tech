import { useState } from "react";
import Navbar from "./Navbar";
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";

const QuestionCard = ({ obj }) => {
  const { postedBy, question, _id, createdAt, type, likes } = obj;
  const timeDifference = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
  const [isLiked, setIsLiked] = useState(obj?.isLiked);

  const navigate = useNavigate();
  const { userData } = useSelector(selectUserData);
  const userId = userData?._id;

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    const response = await axios.post('/api/feed/like', { _id, type, userId });
    setAllLikes(response?.data.data);
  }

  const handleClick = () => {
    navigate(`/users/feed/post=${_id}&type=${type}`);
  }

  return (
    <section className="p-4 sm:p-6 w-full max-w-2xl rounded-2xl shadow-lg bg-gray-100 dark:bg-dark-card transition-all">
      <Navbar user={postedBy} time={timeDifference} data={obj} />
      
      <div onClick={handleClick} className="cursor-pointer">
        <h1 className="font-semibold text-gray-900 dark:text-gray-100 text-lg sm:text-xl">{question}</h1>
      </div>

      <div className="footer px-3 p-2 w-full flex items-center justify-start gap-4 mt-2">
        <div onClick={handleLike} className="likes flex items-center gap-2 cursor-pointer text-gray-900 dark:text-gray-100">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill={`${isLiked ? 'green' : 'none'}`}
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="miter"
          >
            <polygon points="3 14 12 3 21 14 16 14 16 22 8 22 8 14 3 14"></polygon>
          </svg>
          
        </div>
      </div>
    </section>
  );
}

export default QuestionCard;
