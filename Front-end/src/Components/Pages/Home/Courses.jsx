import { FaStar } from "react-icons/fa";

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master MERN stack with hands-on projects and real-world applications.",
    price: "$49.99",
    rating: 4.8,
    image: "https://plus.unsplash.com/premium_photo-1681248156500-8f209e8e466e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cnNlfGVufDB8fDB8fHww",
  },
  {
    id: 2,
    title: "UI/UX Design for Beginners",
    description: "Learn Figma, Adobe XD, and design fundamentals to build stunning UI/UX.",
    price: "$39.99",
    rating: 4.6,
    image: "https://plus.unsplash.com/premium_photo-1681248156500-8f209e8e466e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cnNlfGVufDB8fDB8fHww",
  },
  {
    id: 3,
    title: "Data Structures & Algorithms",
    description: "Improve your problem-solving skills with DSA concepts and coding practice.",
    price: "$59.99",
    rating: 4.9,
    image: "https://plus.unsplash.com/premium_photo-1681248156500-8f209e8e466e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y291cnNlfGVufDB8fDB8fHww",
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
