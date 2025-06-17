import { Courses } from "@/index";
import Testimonial from "./Testimonial";
import { motion } from "framer-motion";
import { FaGraduationCap, FaClock, FaUsers } from "react-icons/fa";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-50" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Learn from the Best,{" "}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              Anytime, Anywhere
            </span>
          </h1>
          <p className="mt-4 text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Explore thousands of courses from top instructors and industry experts.
            Start your learning journey today.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/courses"
              className="px-8 py-4 hover:text-white bg-primary text-white rounded-lg shadow-lg hover:bg-primary/90 transition-colors duration-300 font-medium"
            >
              Explore Courses
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/instructor/signup"
              className="px-8 py-4 bg-white/10 text-white rounded-lg shadow-lg hover:bg-white/20 transition-colors duration-300 font-medium backdrop-blur-sm"
            >
              Become an Instructor
            </motion.a>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={fadeInUp}
            className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-colors duration-300"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
              <FaGraduationCap className="text-2xl text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Expert Instructors</h3>
            <p className="text-gray-300 leading-relaxed">
              Learn from industry leaders and skilled educators who bring real-world experience to your learning journey.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-colors duration-300"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
              <FaClock className="text-2xl text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Flexible Learning</h3>
            <p className="text-gray-300 leading-relaxed">
              Study at your own pace with lifetime access to course materials and learn whenever it suits you best.
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-primary/50 transition-colors duration-300"
          >
            <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center mb-6">
              <FaUsers className="text-2xl text-primary" />
            </div>
            <h3 className="text-2xl font-semibold text-white mb-4">Community Support</h3>
            <p className="text-gray-300 leading-relaxed">
              Join discussions, connect with peers, and get support from a vibrant community of learners.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            Featured Courses
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Discover our most popular courses handpicked by our expert instructors
          </p>
          <Courses />
        </motion.div>
      </section>

      <section className="py-20 px-6 ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-4">
            What Our Students Say
          </h2>
          <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            Hear from our community of learners about their experiences
          </p>
          <Testimonial />
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
