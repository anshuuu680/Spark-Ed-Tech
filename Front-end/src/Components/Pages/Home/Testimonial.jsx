import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    role: "Software Engineer",
    review: "This platform has transformed my learning experience. The courses are well-structured and easy to follow!",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    role: "UX Designer",
    review: "Amazing content and great instructors. Highly recommended for anyone looking to upskill!",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Michael Johnson",
    role: "Data Scientist",
    review: "The best investment I have made in my education. The courses are engaging and informative!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
];

const Testimonial = () => {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (newIndex) => {
    setIndex(newIndex);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute -top-6 -left-6 text-primary/20">
        <FaQuoteLeft size={48} />
      </div>

      <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 md:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 rounded-full blur-lg opacity-50" />
              <img
                src={testimonials[index].image}
                alt={testimonials[index].name}
                className="relative w-24 h-24 rounded-full border-4 border-white/20 shadow-xl"
              />
            </div>

            <div className="text-center max-w-2xl mx-auto">
              <p className="text-xl text-gray-200 leading-relaxed mb-6">
                "{testimonials[index].review}"
              </p>
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {testimonials[index].name}
                </h3>
                <p className="text-primary mt-1">{testimonials[index].role}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-white/20 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white pointer-events-auto hover:bg-white/20 transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.button>
        </div>

        {/* Indicator Dots */}
        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleDotClick(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === i
                  ? "bg-primary scale-110"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
