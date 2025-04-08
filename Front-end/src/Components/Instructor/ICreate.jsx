import { useState } from "react";
import { useNavigate, useParams, Outlet } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import axios from "axios";

function ICreate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    prerequisites: [""],
    learnings: [""],
    thumbnail: null,
    thumbnailPreview: null,
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (type, index, value) => {
    const updatedArray = [...course[type]];
    updatedArray[index] = value;
    setCourse({ ...course, [type]: updatedArray });
  };

  const addArrayField = (type) => {
    setCourse({ ...course, [type]: [...course[type], ""] });
  };

  const deleteArrayField = (type, index) => {
    const updatedArray = [...course[type]];
    updatedArray.splice(index, 1);
    setCourse({ ...course, [type]: updatedArray });
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourse({
        ...course,
        thumbnail: file,
        thumbnailPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", course.title);
    data.append("description", course.description);
    data.append("price", course.price);
    data.append("thumbnail", course.thumbnail);

    course.prerequisites.forEach((prerequisite, index) =>
      data.append(`prerequisites[${index}]`, prerequisite)
    );

    course.learnings.forEach((learning, index) =>
      data.append(`learnings[${index}]`, learning)
    );

    try {
      const response = await axios.post("https://spark-ed-tech.onrender.com/api/instructor/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setCourse({
          title: "",
          description: "",
          price: "",
          prerequisites: [""],
          learnings: [""],
          thumbnail: null,
          thumbnailPreview: null,
        });

        navigate(`/instructor/create-course/${response?.data?.data?._id}`);
      } else {
        alert("Failed to create course");
      }
    } catch (error) {
      console.error("Error creating course:", error);
      alert("An error occurred while creating the course.");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {id ? "Edit Course Sections" : "Create a Course"}
        </h1>

        {!id ? (
          <form onSubmit={handleCreateCourse} className="space-y-4">
            <input
              type="text"
              name="title"
              value={course.title}
              onChange={handleChange}
              placeholder="Course Title"
              className="w-full p-3 border rounded-lg"
              required
            />
            <textarea
              name="description"
              value={course.description}
              onChange={handleChange}
              placeholder="Course Description"
              className="w-full p-3 border rounded-lg"
              required
            ></textarea>
            <input
              type="number"
              name="price"
              value={course.price}
              onChange={handleChange}
              placeholder="Price ($)"
              className="w-full p-3 border rounded-lg"
              required
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full p-2 border rounded"
            />
            {course.thumbnailPreview && (
              <img
                src={course.thumbnailPreview}
                alt="Thumbnail"
                className="w-32 h-32 object-cover rounded shadow-md"
              />
            )}

            <div>
              <label className="block font-medium">Prerequisites</label>
              {course.prerequisites.map((prerequisite, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={prerequisite}
                    onChange={(e) =>
                      handleArrayChange("prerequisites", index, e.target.value)
                    }
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => deleteArrayField("prerequisites", index)}
                    className="text-red-500"
                  >
                    <AiOutlineCloseCircle className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("prerequisites")}
                className="p-2 bg-blue-600 text-white rounded-lg"
              >
                Add Prerequisite
              </button>
            </div>

            <div>
              <label className="block font-medium">What You Will Learn</label>
              {course.learnings.map((learning, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <input
                    type="text"
                    value={learning}
                    onChange={(e) =>
                      handleArrayChange("learnings", index, e.target.value)
                    }
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => deleteArrayField("learnings", index)}
                    className="text-red-500"
                  >
                    <AiOutlineCloseCircle className="w-6 h-6" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayField("learnings")}
                className="p-2 bg-blue-600 text-white rounded-lg"
              >
                Add Learning
              </button>
            </div>

            <button
              type="submit"
              className="p-3 bg-purple-600 text-white rounded-lg w-full"
            >
              Create Course
            </button>
          </form>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
}

export default ICreate;
