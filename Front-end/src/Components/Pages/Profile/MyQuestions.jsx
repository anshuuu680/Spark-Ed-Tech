import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "@/Components/Loader";
import { selectUserData } from "@/Features/userDetails";
import QuestionCard from "../Feed/QuestionCard";

const MyQuestions = () => {
  const [posts, setPosts] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useSelector(selectUserData);


  useEffect(() => {
    const fetchData = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed/get-questions/${userData?.username}`, { withCredentials: true });

        if (response.status == 200) {
          setPosts(response.data.data.questions);
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
      {isLoading ? <div className="w-[80vh] min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div> : <div className="overflow-y-auto no-scrollbar">

      {posts && posts.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-4">
            {posts.map((post) => (
              <QuestionCard key={post._id} obj={post} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-xl font-semibold text-gray-500">
            No Questions
          </div>
        )}


      </div>}

    </div>
  )
}
export default MyQuestions