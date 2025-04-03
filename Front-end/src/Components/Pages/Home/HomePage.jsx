import Testimonial from "./Testimonial";
import Courses from "./Courses";


const HomePage = () => {
  return (
    <div>
      <section className="w-full flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-100">
          Learn from the Best, Anytime, Anywhere
        </h2>
        <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
          Explore thousands of courses from top instructors and industry experts.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <a href="/courses" className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
            Explore Courses
          </a>
          <a href="/instructor/signup" className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
            Become an Instructor
          </a>
        </div>
      </section>
      <section className="py-16 px-6 grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Expert Instructors</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Learn from industry leaders and skilled educators.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Flexible Learning</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Study at your own pace with lifetime access.</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Community Support</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Join discussions and connect with peers.</p>
        </div>
      </section>
      <Courses />
      <Testimonial />
    </div>

  );
};

export default HomePage;
