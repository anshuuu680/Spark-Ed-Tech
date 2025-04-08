import axios from "axios";
import { useState, useEffect } from "react";

function IDashboard() {
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalStudents, setTotalStudents] = useState(0);
  const [recentCourses, setRecentCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("https://spark-ed-tech.onrender.com/api/instructor/all-courses");
        // Uncomment this if real API is used
        const courses = response.data.data;
      

        setTotalCourses(courses.length);
        setTotalStudents(
          courses.reduce((sum, course) => sum + course.students, 0)
        );
        setRecentCourses(courses);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div style={{ padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>
        Instructor Dashboard
      </h1>

      {/* Stats Overview */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>Total Courses</h2>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{totalCourses}</p>
        </div>
        <div
          style={{
            backgroundColor: "white",
            padding: "15px",
            borderRadius: "8px",
            flex: 1,
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "18px" }}>Total Students</h2>
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>{totalStudents}</p>
        </div>
      </div>

      {/* Recent Courses as Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(700px, 1fr))", gap: "20px" }}>
        {recentCourses.map((course) => (
        <div
        key={course.id}
        style={{
          backgroundColor: "white",
          padding: "15px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          width: "350px", // Fixed card width
          height: "300px", // Fixed card height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={course?.thumbnail}
          alt={course?.title}
          style={{
            width: "100%",
            height: "150px", // Fixed image height
            objectFit: "cover", // Ensures the image fits properly
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        />
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          {course?.title}
        </h3>
        <p style={{ margin: "5px 0" }}>
          <strong>Price:</strong> ₹{course.price}
        </p>
        <p style={{ margin: "5px 0" }}>
  {course?.description?.length > 20 
    ? `${course.description.substring(0, 40)}...` 
    : course?.description}
</p>

    
      </div>
      
        ))}
      </div>
    </div>
  );
}

export default IDashboard;
