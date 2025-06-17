import { useLocation } from "react-router-dom";
import QuestionCard from "./QuestionCard"
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/Loader.jsx";


const UserQuestions = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const username = location.pathname.split('/')[2];
    const fetchData = async () => {

      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/feed/get-questions/${username}`, { withCredentials: true });

        if (response.status == 200) {
          setQuestions(response.data.data.questions);
          setIsLoading(false);
        }

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }

    }

    fetchData();

  }, [location.pathname]);

  

  return (
    <div className="w-full h-fit">
      {isLoading ? <div className="w-[80vh] min-h-[50vh] flex items-center justify-center">
        <Loader />
      </div> : <div className="overflow-y-auto no-scrollbar">

        {questions?.map((ques) => (
          <QuestionCard key={ques._id} obj={ques} />
        ))}


      </div>}

    </div>
  )
}
export default UserQuestions