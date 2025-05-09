import { Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios"; 

function ICourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/instructor/all-courses`, { withCredentials: true });
        setCourses(response.data.data); // Ensure API response matches
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/instructor/course/${id}`, { withCredentials: true });
      setCourses((prevCourses) => prevCourses.filter((course) => course._id !== id));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Instructor Courses</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading courses...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : courses.length === 0 ? (
          <p className="text-center text-gray-500">No courses available.</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course._id} className="p-4 border rounded-lg bg-gray-50 shadow-md flex items-center">
                {/* Course Thumbnail */}
                <img
                  src={course.thumbnail || "https://via.placeholder.com/150"}
                  alt={course.title}
                  className="w-24 h-24 object-cover rounded-lg mr-4"
                />

                {/* Course Details */}
                <div className="flex-1">
                  <h2 className="text-xl font-bold">{course.title}</h2>
                  <p className="text-gray-600 font-medium">₹{course.price}</p>
                  <p className="text-gray-700 text-sm">{course.description}</p>

                  {/* Edit & Delete Buttons */}
                  <div className="flex justify-end mt-3 space-x-3">
                    <Link to={`/instructor/courses/${course._id}`} className="text-blue-500">
                      <FaEdit size={20} />
                    </Link>
                    <button onClick={() => handleDelete(course._id)} className="text-red-500">
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ICourses;
