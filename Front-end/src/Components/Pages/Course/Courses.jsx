import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ClipLoader } from "react-spinners";
import { set } from "date-fns";

const Courses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/all-courses`, { withCredentials: true });
        if (response.status === 200) {

          setCourses(response.data.data);
          console.log(response.data.data)
          setIsLoading(false);
        }
      } catch (error) {
        // console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-900">
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md py-4 flex flex-col gap-4 text-center">
          <Link to="/" className="text-gray-700 dark:text-gray-300">Home</Link>
          <Link to="/community" className="text-gray-700 dark:text-gray-300">Community</Link>
          <Link to="/about" className="text-gray-700 dark:text-gray-300">About</Link>
          <Link to="/contact" className="text-gray-700 dark:text-gray-300">Contact</Link>
        </div>
      )}

      <div className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-10">All Courses</h2>
        

          {isLoading ? (<div className="flex  justify-center items-center h-[500px]">
           
            <ClipLoader color='skyBlue' />  
            </div>) : ( <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{courses.map((course) => (
            <div key={course._id} className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden hover:scale-105 transition">
              <img src={course?.thumbnail} alt={course.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h4>
                <p className="text-gray-600 dark:text-gray-300">Instructor: <span className="font-medium">{course.instructor?.name}</span></p>
                <div className="flex items-center mt-2">
                  <span className="text-yellow-500">⭐ {course?.rating}</span>
                  <span className="ml-auto text-lg font-bold text-teal-600">{course.price}</span>
                </div>
                <Link to={`/courses/${course?._id}`} className="block mt-4 px-4 py-2 text-center bg-blue-600 text-white rounded-md hover:bg-blue-700">View Details</Link>
              </div>
            </div>
          ))} </div>) }


         
        
      </div>
    </div>
  );
};

export default Courses;