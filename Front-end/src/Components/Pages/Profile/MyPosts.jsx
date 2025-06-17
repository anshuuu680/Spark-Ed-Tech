import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import PostCard from "../Feed/PostCard";
import Loader from "@/components/Loader";
import { selectUserData } from "@/Features/userDetails";

const MyPosts = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useSelector(selectUserData);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed/get-posts/${userData?.username}`, { withCredentials: true });

        if (response.status == 200) {
          setPosts(response.data.data.posts);
          setIsLoading(false);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }

    }

    fetchData();

  }, [location.pathname])


  return (
    <div className="w-full h-fit">
      {isLoading ? <div className="w-full min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div> : <div className="overflow-y-auto no-scrollbar flex flex-col gap-4 w-full h-fit">

        {posts && posts.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {posts.map((post) => (
              <PostCard key={post._id} obj={post} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-xl font-semibold text-gray-500">
            No Posts
          </div>
        )}



      </div>}

    </div>
  )
}
export default MyPosts