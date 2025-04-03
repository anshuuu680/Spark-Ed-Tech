import { selectUserData, setUserData } from '@/Features/userDetails';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ user, time, data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector(selectUserData);
  const [saved, setSaved] = useState((userData?.savedPosts.includes(data?._id) || userData?.savedQuestions.includes(data?._id)) ? true : false);


  const handleClick = () => {
    if (userData?._id === user._id) {
      navigate(`/users/dashboard`);
    } else {
      navigate(`/users/${user?.username}/posts`);
    }
  };

  const handleSave = async () => {
    const response = await axios.post("/api/saved", { data });
    if (response.status == 200) {
      setSaved(response?.data.data.saved);
      dispatch(setUserData(response?.data.data.user));
    }
  }


  return (
    <div className="nav-card h-14 sm:h-12 min-w-fit flex justify-between items-center bg-transparent dark:text-gray-100">
      <div className="nav-left flex items-center gap-2">
        <div className="dp sm:w-8 sm:h-8 w-10 h-10 bg-red rounded-full overflow-hidden border border-teal-300">
          <img style={{ width: '100%', height: '100%' }} src={user?.avatar} alt="" />
        </div>
        <h1 className='cursor-pointer text-lg sm:text-md font-semibold' onClick={handleClick}>
          {user?.username}
        </h1>
        <p className="text-xs text-gray-600 dark:text-gray-100 hidden sm:inline">| {time} |</p>
      </div>
      <div onClick={handleSave} className="nav-right cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={`${saved ? "#fff" : "none"}`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
        </svg>

      </div>
    </div>
  );
};

export default Navbar;
