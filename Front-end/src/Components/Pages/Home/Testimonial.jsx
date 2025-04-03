import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const testimonials = [
  {
    name: "John Doe",
    review: "This platform has transformed my learning experience. The courses are well-structured and easy to follow!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    review: "Amazing content and great instructors. Highly recommended for anyone looking to upskill!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Johnson",
    review: "The best investment I have made in my education. The courses are engaging and informative!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval); // Cleanup interval
  }, []);

  return (
    <div className="max-w-3xl mx-auto my-10 p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">What Our Students Say</h2>
      <div className="relative w-full flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="flex flex-col items-center w-full"
          >
            <img
              src={testimonials[index].image}
              alt={testimonials[index].name}
              className="w-24 h-24 rounded-full border-4 border-blue-400 shadow-lg mb-4"
            />
            <p className="text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">
              "{testimonials[index].review}"
            </p>
            <h3 className="mt-3 text-lg font-semibold text-gray-900 dark:text-white">
              - {testimonials[index].name}
            </h3>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicator Dots */}
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <div
            key={i}
            className={`h-2 w-2 rounded-full transition-all ${
              index === i ? "bg-blue-500 scale-110" : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
