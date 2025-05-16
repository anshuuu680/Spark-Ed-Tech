import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";
import { set } from "date-fns";
import { ClipLoader } from "react-spinners";

const MyClassroom = () => {
  const { id } = useParams();
  const [openSection, setOpenSection] = useState(null);
  const [data, setData] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleVideoSelect = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/course/${id}`, { withCredentials: true });
        if (response.status === 200) {
          setIsLoading(false);
          console.log(response.data.data.course);
          setData(response.data.data.course);
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching course:", error);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="w-full h-[95vh] mx-auto py-8 px-4 md:px-6 bg-white text-gray-900 dark:bg-gray-900 dark:text-white min-h-[40vw] overflow-y-auto no-scrollbar">
     
     {isLoading ? (
        <div className="flex justify-center items-center h-full">
          <ClipLoader color="skyBlue" />
        </div>
      ) : (
        <>
          {data ? (
            <div className="flex items-center gap-4">
           <div className="md:h-[500px] w-[400px] overflow-hidden rounded-md">
  <img
    className="w-full h-full object-contain"
    src={data.thumbnail}
    alt={data.title || "Course Thumbnail"}
  />
</div>

              <div className="flex flex-col w-2/3">

              <h1 className="text-3xl font-bold">{data.title}</h1>
              <br />
              <p className="text-gray-600 dark:text-gray-400">{data.description}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-500">Course not found</p>
          )}
        </>
      )}

      <br />
     
      <>
      {/* Video Player Section */}
      {selectedVideo && (
        <div className="w-full h-2/3 bg-black flex flex-col items-center justify-center relative">
          <video ref={videoRef} src={selectedVideo} className="w-full h-full object-contain" controls />
        </div>
      )}

      <div className="bg-gray-100 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h2 className="text-2xl font-bold">{data?.title}</h2>
          <p className="mt-1 text-gray-600 dark:text-gray-400">
            <span className="font-medium">{data?.instructorDetails?.name}</span>
          </p>

         
          {data?.sections?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold">Course Curriculum</h3>
              <div className="mt-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                <ul className="space-y-3">
                  {data?.sections?.map((section, index) => (
                    <li key={index} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md">
                      <button
                        className="w-full flex justify-between items-center text-left font-medium"
                        onClick={() => toggleSection(index)}
                      >
                        <span>Section {index + 1}: {section.title}</span>
                        {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
                      </button>

                      {/* Show videos when section is open */}
                      {openSection === index && section?.section?.length > 0 && (
                        <ul className="mt-2 space-y-2 text-gray-800 dark:text-gray-300">
                          {section?.section.map((lecture, i) => (
                            <li 
                              key={i} 
                              className={`p-2 rounded-md transition-all duration-300 
                                ${selectedVideo === lecture?.lecture 
                                  ? "bg-blue-500 text-white dark:bg-blue-600" // Active Video Styling
                                  : "bg-gray-300 dark:bg-gray-600" // Default Styling
                                }`
                              }
                            >
                              <button
                                onClick={() => handleVideoSelect(lecture?.lecture)}
                                className="flex gap-2 w-full text-left"
                              >
                                <Video size={24} /> {lecture.title}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
            </>

    </div>
  );
};

export default MyClassroom;
