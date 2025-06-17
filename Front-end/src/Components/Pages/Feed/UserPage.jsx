import { Button } from "@/components/ui/button"
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom"

const UserPage = () => {

  const location = useLocation();
  const [user, setUser] = useState();
  const [count,setCount] = useState({});
  const username = location.pathname.split("/")[2];

  useEffect(() => {

    const fetchUser = async () => {


      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/${username}`, { withCredentials: true });
      setUser(response?.data.data.user);
      setCount(
        {
          posts: response?.data.data.postCount,
          questions : response?.data.data.questionCount
        });

    }

    fetchUser();



  }, [])


  return (
    <div className="w-full min-h-[10vh] bg-gray-100 dark:bg-dark-card  p-4 rounded-md">
      <div className="w-full h-fit  flex flex-col justify-center items-center gap-4">
        <div className="w-32 h-32 rounded-full border-2 border-blue-300">
          <img className='w-full h-full object-cover rounded-full' src={user?.avatar} alt="" />
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <h1 className='font-semibold dark:text-gray-100'>{user?.fullName}</h1>
          <h1 className='text-sm font-semibold dark:text-gray-400'>{user?.username}</h1>
        </div>

        <div className="w-full grid grid-cols-2 gap-4">
          <div className="h-16 bg-gray-100 dark:bg-dark-inside-card rounded-md flex flex-col justify-center items-center dark:text-gray-100">
            <h1 className='text-sm'>Posts</h1>
            <h1 className="font-semibold">{count?.posts}</h1>
          </div>

          <div className="h-16 bg-gray-100 dark:bg-dark-inside-card rounded-md flex flex-col justify-center items-center dark:text-gray-100">
            <h1 className='text-sm'>Questions</h1>
            <h1 className="font-semibold">{count?.questions}</h1>
          </div>

        </div>

        <div className="flex justify-centre">
          <Button><NavLink to={`/users/chat/${user?._id}`}>Message</NavLink> </Button>
        </div>

      </div>
    </div>
  )
}
export default UserPage