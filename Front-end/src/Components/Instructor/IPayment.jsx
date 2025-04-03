import { useState } from "react";

function IPayment() {
  const [instructor, setInstructor] = useState({
    name: "John Doe",
    totalEarnings: 12500,
    totalCourses: 5,
    totalStudents: 240,
    courses: [
      { id: 1, title: "React for Beginners", earnings: 3500, students: 120 },
      { id: 2, title: "Advanced JavaScript", earnings: 2700, students: 80 },
      { id: 3, title: "MERN Stack Mastery", earnings: 4000, students: 150 },
      { id: 4, title: "Tailwind CSS Guide", earnings: 1500, students: 60 },
      { id: 5, title: "Node.js API Development", earnings: 800, students: 30 },
    ],
    paymentHistory: [
      { date: "2025-03-01", amount: 5000, status: "Completed" },
      { date: "2025-02-15", amount: 3000, status: "Completed" },
      { date: "2025-01-25", amount: 4500, status: "Completed" },
    ],
  });

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Instructor Payment Dashboard</h1>

        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-bold">Instructor: {instructor.name}</h2>
          <p className="text-lg mt-2">Total Earnings: <strong>${instructor.totalEarnings}</strong></p>
          <p className="text-lg">Total Courses Sold: <strong>{instructor.totalCourses}</strong></p>
          <p className="text-lg">Total Students: <strong>{instructor.totalStudents}</strong></p>
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-4">Course Earnings</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          {instructor.courses.map((course) => (
            <div key={course.id} className="flex justify-between p-3 border-b">
              <p className="font-medium">{course.title}</p>
              <div className="text-right">
                <p className="text-green-600 font-bold">${course.earnings}</p>
                <p className="text-sm text-gray-500">{course.students} Students</p>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">Payment History</h2>
        <div className="bg-gray-50 p-4 rounded-lg shadow-md">
          {instructor.paymentHistory.map((payment, index) => (
            <div key={index} className="flex justify-between p-3 border-b">
              <p className="font-medium">{payment.date}</p>
              <p className={`font-bold ${payment.status === "Completed" ? "text-green-600" : "text-red-500"}`}>
                ${payment.amount} - {payment.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default IPayment;
