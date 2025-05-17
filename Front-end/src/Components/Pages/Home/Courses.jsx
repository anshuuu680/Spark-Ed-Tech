import { FaStar } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development (Demo)",
    description: "Master MERN stack with hands-on projects and real-world applications.",
    price: "₹49.99",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1587691592099-24045742c181?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Y291cnNlJTIwc29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 2,
    title: "UI/UX Design for Beginners (Demo)",
    description: "Learn Figma, Adobe XD, and design fundamentals to build stunning UI/UX.",
    price: "₹39.99",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1669023414162-5bb06bbff0ec?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y291cnNlJTIwc29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms (Demo)",
    description: "Improve your problem-solving skills with DSA concepts and coding practice.",
    price: "₹59.99",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1598978028953-799807c097b5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y291cnNlJTIwc29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
  },
];

const Courses = () => {
  return (
    <section className="max-w-6xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Popular Courses
      </h2>
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <img src={course.image} alt={course.title} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{course.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{course.description}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-lg font-bold text-teal-600">{course.price}</span>
                <span className="flex items-center text-yellow-500">
                  <FaStar className="mr-1" /> {course.rating}
                </span>
              </div>
              <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Courses;
