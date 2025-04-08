import { useLocation } from "react-router-dom"
import PostCard from "./PostCard"
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/Components/Loader.jsx";

const UserPosts = () => {
  const location = useLocation();
  const [posts,setPosts] = useState();
  const [isLoading,setIsLoading] = useState(true);

  useEffect(() => {
    const username = location.pathname.split('/')[2];
    const fetchData = async () => {

      try {
        const response = await axios.get(`https://spark-ed-tech.onrender.com/api/feed/get-posts/${username}`);

        if(response.status==200){
          setPosts(response.data.data.posts);
          setIsLoading(false);
        }

      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false);
      }

    }

    fetchData();

  }, [location.pathname])


  return (
    <div className="w-full h-fit">
    {isLoading? <div className="w-[80vh] min-h-[50vh] flex items-center justify-center">
        <Loader/>
    </div> : <div className="overflow-y-auto no-scrollbar">

      {posts?.map((post)=>(
        <PostCard key={post._id} obj={post}/>
      ))}


    </div> }

    </div>
  )
}
export default UserPosts