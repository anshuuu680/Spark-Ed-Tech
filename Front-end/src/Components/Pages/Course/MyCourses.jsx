import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function MyCourses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/my-courses`,
        { withCredentials: true }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="w-full min-h-screen px-4 py-8 ">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        My Learnings
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center h-[50vh]">
          <ClipLoader color="skyblue" size={50} />
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-300 text-lg">
          You haven’t enrolled in any courses yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-gray-700 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              <img
                src={item?.course?.thumbnail}
                alt={item?.course?.title}
                className="w-full h-44 object-cover"
              />

              <div className="p-2 flex flex-col flex-grow gap-1">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white line-clamp-2">
                  {item?.course?.title}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Instructor:{" "}
                  <span className="font-medium">
                    {item?.course?.instructor?.name}
                  </span>
                </p>

                <button
                  onClick={() =>
                    navigate(`/users/my-courses/${item?.course?._id}`)
                  }
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                >
                  Continue
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyCourses;
