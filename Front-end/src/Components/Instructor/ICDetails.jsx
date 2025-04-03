import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function ICDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [newLectureTitle, setNewLectureTitle] = useState("");
  const [newLectureFile, setNewLectureFile] = useState(null);

  // New state for editable course details
  const [editedTitle, setEditedTitle] = useState("");
  const [editedPrice, setEditedPrice] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`/api/instructor/courses/${id}`);
        const { course, sections } = response.data.data;
        setCourse({ course, sections });
       
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchCourseDetails();
  }, [id]);

  useEffect(() => {
    if (course) {
      setEditedTitle(course.course.title);
      setEditedPrice(course.course.price);
      setEditedDescription(course.course.description);
    }
  }, [course]);

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const addLecture = async (sectionId) => {
    if (!newLectureTitle) {
      alert("Please provide a title for the lecture.");
      return;
    }
    if (!newLectureFile) {
      alert("Please select a video file for the lecture.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newLectureTitle);
    formData.append("lecture", newLectureFile);
    formData.append("sectionId", sectionId);

    try {
      setIsLoading(true)
      const response = await axios.post(
        `/api/instructor/add-lecture`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(response.status==200){
        setIsLoading(false)
        toast.success("Lecture has been added.");
      }

      setCourse((prev) => ({
        ...prev,
        sections: prev.sections.map((sec) =>
          sec._id === sectionId
            ? { ...sec, lectures: [...(sec.lectures || []), response.data.lecture] }
            : sec
        ),
      }));

      setNewLectureTitle("");
      setNewLectureFile(null);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to add lecture");
    }
  };

  const addSection = async () => {
    if (!newSectionTitle) {
      alert("Please provide a title for the section.");
      return;
    }

    try {
      const response = await axios.post(`/api/instructor/${id}/add-section`, {
        title: newSectionTitle,
      });

      if(response.status==200){
        toast.success("Lecture has been added.");
      }

      setCourse((prev) => ({
        ...prev,
        sections: [...prev.sections, response.data.data],
      }));
      setNewSectionTitle("");
    } catch (err) {
      // setError(err.response?.data?.message || "Failed to add section");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post(`/api/instructor/${id}/details-change`, {
        title: editedTitle,
        price: editedPrice,
        description: editedDescription,
      });

      if(response.status==200){
        toast.success("Details has been changed.");
      }

      setCourse((prev) => ({
        ...prev,
        course: {
          ...prev.course,
          title: editedTitle,
          price: editedPrice,
          description: editedDescription,
        },
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update course details");
    }
  };

  const deleteSection = async (sectionId) => {
    try {
    const response =   await axios.post(`/api/instructor/delete-section`, { sectionId });

      if(response.status==200){
        toast.success("Section has been Deleted.");
      }
      setCourse((prev) => ({
        ...prev,
        sections: prev.sections.filter((sec) => sec._id !== sectionId),
      }));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete section");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Course Details</h1>

        {loading ? (
          <p className="text-center text-gray-500">Loading course details...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : course ? (
          <div>
            <img
              src={course?.course.thumbnail || "https://via.placeholder.com/300"}
              alt={course.course.title}
              className="w-full h-60 object-cover rounded-lg mb-4"
            />

            {/* Editable Course Details */}
            <div className="mt-4">
              <label className="block text-gray-700">Title:</label>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Price:</label>
              <input
                type="text"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
                className="border p-2 w-full rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block text-gray-700">Description:</label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border p-2 w-full rounded"
              ></textarea>
            </div>
            <button onClick={handleSaveChanges} className="mt-2 bg-blue-500 text-white px-3 py-1 rounded">
              Save Changes
            </button>

            {/* Display current course details for reference */}
            <h2 className="text-2xl font-bold mt-6">{course.course.title}</h2>
            <p className="text-gray-600 text-lg">${course.course.price}</p>
            <p className="text-gray-700 mt-2">{course.course.description}</p>

            <h3 className="text-xl font-bold mt-6">Add New Section</h3>
            <div className="mt-4">
              <input
                type="text"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
                placeholder="Enter section title"
                className="border p-2 w-full rounded"
              />
              <button onClick={addSection} className="mt-2 bg-green-500 text-white px-3 py-1 rounded">
                Add Section
              </button>
            </div>

            <h3 className="text-xl font-bold mt-6">Sections</h3>
            {course.sections.map((section, index) => (
              <div key={section._id} className="mt-4 p-4 border rounded-lg bg-gray-50">
                <h4
                  className="text-lg font-semibold cursor-pointer"
                  onClick={() => toggleSection(section._id)}
                >
                  Section {index + 1}: {section.title} {expandedSections[section._id] ? "▲" : "▼"}
                </h4>
                {/* Delete Section Button */}
                <button 
                  onClick={() => deleteSection(section._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete Section
                </button>
                {expandedSections[section._id] && (
                  <>
                    <ul className="mt-4 list-disc pl-5">
                      {section?.section?.map((lecture, idx) => (
                        <li key={lecture._id} className="text-gray-700">
                          Lecture {idx + 1}: {lecture.title}
                          <video controls className="w-72 h-56 mt-2 rounded-lg">
                            <source src={lecture.lecture} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </li>
                      ))}
                    </ul>
                    <h5 className="mt-4 font-semibold">Add Lecture</h5>
                    <input
                      type="text"
                      value={newLectureTitle}
                      onChange={(e) => setNewLectureTitle(e.target.value)}
                      placeholder="Enter lecture title"
                      className="border p-2 w-full rounded mt-2"
                    />
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => setNewLectureFile(e.target.files[0])}
                      className="border p-2 w-full rounded mt-2"
                    />
                    <button
                      onClick={() => addLecture(section._id)}
                      className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
                    >
                     {isLoading?"Adding Lecture...":"Add Lecture"}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Course not found.</p>
        )}
      </div>
    </div>
  );
}

export default ICDetails;
