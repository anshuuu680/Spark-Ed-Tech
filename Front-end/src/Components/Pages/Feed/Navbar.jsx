import { selectUserData, setUserData } from '@/Features/userDetails';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, time, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(selectUserData);
  const [saved, setSaved] = useState(
    userData?.savedPosts.includes(data?._id) || userData?.savedQuestions.includes(data?._id)
  );

  const handleClick = () => {
    if (userData?._id === user._id) {
      navigate('/users/dashboard');
    } else {
      navigate(`/users/${user?.username}/posts`);
    }
  };

  const handleSave = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/saved`,
      { data },
      { withCredentials: true }
    );
    if (response.status === 200) {
      setSaved(response.data.data.saved);
      dispatch(setUserData(response.data.data.user));
    }
  };

  return (
    <div className="flex items-center justify-between  py-2 bg-transparent dark:text-white">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-teal-300">
          <img
            src={user?.avatar}
            alt={user?.username}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1">
          <span
            className="font-semibold text-base sm:text-sm cursor-pointer hover:underline"
            onClick={handleClick}
          >
            {user?.username}
          </span>
          <span className="text-xs text-gray-600 dark:text-gray-400 hidden sm:inline">
            | {time} |
          </span>
        </div>
      </div>

      <button
        onClick={handleSave}
        className="p-1 rounded hover:bg-white/10 transition"
        aria-label="Save post"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 stroke-current"
          fill={saved ? '#4ade80' : 'none'}
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
        </svg>
      </button>
    </div>
  );
};

export default Navbar;
