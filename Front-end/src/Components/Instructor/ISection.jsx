import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ISection() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [sections, setSections] = useState([]);
  const [newSection, setNewSection] = useState({ title: "", videos: [] });
  const [uploading, setUploading] = useState(false);
 

  useEffect(() => {
    // Fetch course data
    axios
      .get(`/instructor/course-data/${id}`)
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleSectionTitleChange = (e) => {
    setNewSection((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleAddVideo = () => {
    setNewSection((prev) => ({
      ...prev,
      videos: [...prev.videos, { file: null, title: "" }],
    }));
  };

  const handleFileChange = (index, file) => {
    if (file) {
      setNewSection((prev) => {
        const updatedVideos = [...prev.videos];
        updatedVideos[index].file = file;
        return { ...prev, videos: updatedVideos };
      });
    }
  };

  const handleVideoTitleChange = (index, title) => {
    setNewSection((prev) => {
      const updatedVideos = [...prev.videos];
      updatedVideos[index].title = title;
      return { ...prev, videos: updatedVideos };
    });
  };

  const handleCreateSection = async () => {
    if (uploading) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("title", newSection.title);

    newSection.videos.forEach(({ file, title }, index) => {
      if (file && title) {
        formData.append("videos", file); // Append each file
        formData.append("videoTitles[]", title); // Append each title
      } else {
        // console.error(`Missing file or title for video at index ${index}`);
      }
    });

   

    try {
      
      const res = await axios.post(`https://spark-ed-tech.onrender.com/api/instructor/create-section/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSections([...sections, res.data.data.section]);
      setNewSection({ title: "", videos: [] });
      
    } catch (error) {
      console.error("Error uploading section", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "auto",
        padding: "20px",
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        background: "#f9f9f9",
        borderRadius: "10px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          color: "#333",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        📚 Manage Course Sections
      </h1>
      {course && (
        <h2
          style={{
            textAlign: "center",
            fontSize: "22px",
            color: "#555",
            marginBottom: "30px",
          }}
        >
          Course: {course.title}
        </h2>
      )}
      <div
        style={{
          background: "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
            color: "#222",
            fontWeight: "bold",
          }}
        >
          🆕 Create New Section
        </h3>
        <input
          type="text"
          placeholder="Section Title"
          value={newSection.title}
          onChange={handleSectionTitleChange}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        {newSection.videos.map((video, index) => (
          <div
            key={index}
            style={{
              marginBottom: "15px",
              padding: "10px",
              background: "#f3f3f3",
              borderRadius: "5px",
            }}
          >
            <input
              type="file"
              onChange={(e) => handleFileChange(index, e.target.files[0])}
              accept="video/*"
              style={{
                display: "block",
                marginBottom: "10px",
              }}
            />
            <input
              type="text"
              placeholder="Video Title"
              value={video.title}
              onChange={(e) => handleVideoTitleChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>
        ))}
        <button
          onClick={handleAddVideo}
          style={{
            padding: "10px 20px",
            background: "#007BFF",
            color: "#ffffff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          ➕ Add Another Video
        </button>
        <button
          onClick={handleCreateSection}
          disabled={uploading}
          style={{
            width: "100%",
            padding: "12px",
            background: uploading ? "#ccc" : "#4CAF50",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: uploading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {uploading ? "Uploading..." : "Create Section"}
        </button>
      </div>
      <div style={{ marginTop: "30px" }}>
        <h3 style={{ marginBottom: "10px", color: "#333" }}>
          📌 Existing Sections
        </h3>
        {sections.length === 0 ? (
          <p style={{ textAlign: "center", color: "#777" }}>
            No sections available
          </p>
        ) : (
          sections.map((section, index) => (
            <div
              key={index}
              style={{
                background: "#ffffff",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h4
                style={{
                  color: "#222",
                  fontSize: "18px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {section.title}
              </h4>
              <ul style={{ paddingLeft: "20px", listStyleType: "disc" }}>
                {section?.videos?.map((video, idx) => (
                  <li
                    key={idx}
                    style={{
                      color: "#E91E63",
                      fontSize: "14px",
                    }}
                  >
                    {video}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ISection;
