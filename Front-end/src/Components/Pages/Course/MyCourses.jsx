import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function MyCourses() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // Fetch user's courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://spark-ed-tech.onrender.com/api/course/my-courses");
      setData(response.data.data); // Assuming API response has { data: { data: [...] } }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <section className="w-full h-[90vh] overflow-y-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        My Learnings
      </h1>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((data, index) => (
          <div
            key={index}
            className="w-full border border-gray-400 dark:border-gray-600 p-4 rounded-lg bg-light-card dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-black transition-all duration-300 flex flex-col gap-4 shadow-md"
          >
            {/* Course Thumbnail */}
            <img
              src={data?.course?.thumbnail}
              alt={data?.course?.title}
              className="w-full h-40 object-cover rounded-md"
            />

            {/* Course Details */}
            <div>
              <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                {data?.course?.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">{data?.course?.instructor?.name}</span>
              </p>
            </div>

            {/* Continue Button */}
            <button
              onClick={() => navigate(`/users/my-courses/${data?.course?._id}`)}
              className="mt-auto px-4 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
            >
              Continue
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyCourses;
