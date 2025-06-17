import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Video } from "lucide-react";
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
    setTimeout(() => {
      videoRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/course/${id}`,
          { withCredentials: true }
        );
        if (response.status === 200) {
          setData(response.data.data.course);
        }
      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  return (
    <div className="w-full min-h-screen px-4 sm:px-10 py-8 bg-white dark:bg-[#0c0c0c] text-gray-900 dark:text-white transition-all duration-300">
      {isLoading ? (
        <div className="flex justify-center items-center h-[70vh]">
          <ClipLoader color="#0ea5e9" />
        </div>
      ) : (
        <>
          {selectedVideo ? (
            <div
              ref={videoRef}
              className="rounded-xl overflow-hidden border dark:border-gray-800 shadow-lg transition-all duration-300"
            >
              <video
                src={selectedVideo}
                className="w-full max-h-[500px] object-contain"
                controls
                autoPlay
              />
            </div>
          ) : (
            <>
              {data ? (
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="w-full md:w-1/2 rounded-xl overflow-hidden border dark:border-gray-800 shadow-md">
                    <img
                      src={data.thumbnail}
                      alt={data.title || "Course Thumbnail"}
                      className="w-full h-[300px] object-cover transition-all duration-300 hover:scale-105"
                    />
                  </div>

                  <div className="w-full md:w-1/2 space-y-3">
                    <h1 className="text-3xl font-bold leading-snug">{data.title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed">
                      {data.description}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 mt-10 text-center">Course not found</p>
              )}
            </>
          )}

          {!selectedVideo && (
            <div className="mt-14 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg p-5 transition-all duration-300">
              <h2 className="text-xl font-semibold mb-1">{data?.title}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-5">
                By <span className="font-medium">{data?.instructorDetails?.name}</span>
              </p>

              {data?.sections?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Course Curriculum</h3>
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 no-scrollbar transition-all duration-300">
                    {data?.sections.map((section, index) => (
                      <div
                        key={index}
                        className="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 shadow-sm transition-all duration-300 hover:shadow-md"
                      >
                        <button
                          className="w-full flex justify-between items-center px-4 py-3 font-medium text-left text-base hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                          onClick={() => toggleSection(index)}
                        >
                          <span>Section {index + 1}: {section.title}</span>
                          {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            openSection === index ? "max-h-[800px] py-2 px-4" : "max-h-0"
                          }`}
                        >
                          <ul className="space-y-2">
                            {section.section.map((lecture, i) => (
                              <li
                                key={i}
                                onClick={() => handleVideoSelect(lecture.lecture)}
                                className={`rounded-md border px-3 py-2 cursor-pointer flex items-center gap-3 transition-all duration-300 ${
                                  selectedVideo === lecture.lecture
                                    ? "bg-blue-600 text-white border-blue-600"
                                    : "bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200"
                                }`}
                              >
                                <Video size={18} /> <span className="text-sm">{lecture.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyClassroom;
