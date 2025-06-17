import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/all-courses`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const renderedCourses = useMemo(
    () =>
      courses?.map((course) => (
        <div
          key={course._id}
          className="border border-gray-800 p-4 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition duration-300"
        >
          <img
            src={course?.thumbnail}
            alt={course.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-5 space-y-2">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-1">
              {course.title}
            </h3>
            <p className="text-gray-500 dark:text-gray-300 text-sm">
              Instructor:{" "}
              <span className="font-medium">{course.instructor?.name}</span>
            </p>
            <div className="flex items-center justify-between">
              <span className="text-yellow-500 text-sm">
                ⭐ {course?.rating || "4.5"}
              </span>
              <span className="text-teal-600 dark:text-teal-400 font-bold text-lg">
                ₹{course.price}
              </span>
            </div>
            <Link
              to={`/courses/${course._id}`}
              className="mt-3 inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition"
            >
              View Details
            </Link>
          </div>
        </div>
      )),
    [courses]
  );

  return (
    <div className="w-full min-h-screen mt-20 bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-50" />
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Explore Our Courses
        </h2>
        {isLoading ? (
          <div className="flex justify-center items-center h-[400px]">
            <ClipLoader color="skyblue" size={50} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {renderedCourses}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
