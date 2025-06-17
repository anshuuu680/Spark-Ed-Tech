import axios from "axios";
import { useEffect, useState } from "react";
import { FaStar, FaUsers, FaChevronDown, FaChevronUp, FaClock, FaPlay, FaCheckCircle } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { Video, BookOpen, Award, Users } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import { ClipLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = useSelector(selectUserData);

  const [openSection, setOpenSection] = useState(null);
  const [data, setData] = useState();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const onPayment = async () => {
    try {
      setIsPaymentLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/payment/create-order`,
        { id },
        { withCredentials: true }
      );

      const paymentObject = new Razorpay({
        key: "rzp_test_drUfjelNqCIKZ6",
        order_id: response.data.data?.id,
        ...response.data.data,
        handler: async (res) => {
          const options = {
            order_id: res.razorpay_order_id,
            payment_id: res.razorpay_payment_id,
            signature: res.razorpay_signature,
            course_id: id,
          };

          try {
            const respon = await axios.post(
              `${import.meta.env.VITE_BACKEND_URL}/payment/verify-payment`,
              options,
              { withCredentials: true }
            );
            if (respon.status === 200) {
              alert("Payment successful");
              setIsEnrolled(true);
            } else {
              alert("Payment verification failed");
            }
          } catch {
            alert("An error occurred while verifying payment");
          } finally {
            setIsPaymentLoading(false);
          }
        },
      });

      paymentObject.open();
    } catch (error) {
      console.log(error);
      setIsPaymentLoading(false);
    }
  };

  const handleClick = () => {
    if (!userData?._id) {
      navigate("/login");
    } else if (!isEnrolled) {
      onPayment();
    }
  };

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetch = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/course/${id}`,
        {
          withCredentials: true,
          params: { userId: userData?._id },
        }
      );
      if (response.status === 200) {
        setData(response.data.data.course);
        setIsLoading(false);
        if (response.data.data.cours !== null) setIsEnrolled(true);
      }
    };
    fetch();
  }, [userData?._id]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  if (isLoading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen  flex justify-center items-center bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <ClipLoader color="#60A5FA" size={50} />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-50" />
     
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl  mx-auto px-4 py-10 text-white grid grid-cols-1 lg:grid-cols-3 gap-10"
      >
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          {/* Header Section */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              {data?.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-lg mb-4"
            >
              by {data?.instructorDetails?.name}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6 mt-4"
            >
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="font-bold text-2xl text-emerald-400 flex items-center gap-2"
              >
                ₹ {data?.price}
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="text-yellow-400 flex items-center gap-2 bg-yellow-400/10 px-3 py-1 rounded-full"
              >
                <FaStar /> {data?.rating}
              </motion.span>
              <motion.span 
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 text-blue-300 bg-blue-300/10 px-3 py-1 rounded-full"
              >
                <Users size={16} /> {data?.enrolledUsers} students
              </motion.span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-gray-300 text-lg leading-relaxed"
            >
              {data?.description}
            </motion.p>
            
            <motion.button
              onClick={handleClick}
              disabled={(userData?._id && isEnrolled) || isPaymentLoading}
              whileHover={{ scale: userData?._id && isEnrolled ? 1 : 1.02 }}
              whileTap={{ scale: userData?._id && isEnrolled ? 1 : 0.98 }}
              className={`w-full mt-8 px-8 py-4 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                userData?._id && isEnrolled
                  ? "bg-emerald-500/20 text-emerald-400 cursor-not-allowed border border-emerald-400/30"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isPaymentLoading ? (
                <ClipLoader color="white" size={20} />
              ) : userData?._id ? (
                isEnrolled ? (
                  <>
                    <FaCheckCircle /> Already Enrolled
                  </>
                ) : (
                  <>
                    <FaPlay /> Enroll Now
                  </>
                )
              ) : (
                "Login to Enroll"
              )}
            </motion.button>
          </motion.div>

          {/* What You Will Learn */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold mb-6 flex items-center gap-3"
            >
              <BookOpen className="text-blue-400" />
              What You Will Learn
            </motion.h3>
            <motion.ul className="space-y-4">
              {data?.learnings.map((outcome, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-blue-400/30 transition-all"
                >
                  <FaCheckCircle className="text-emerald-400 mt-1 flex-shrink-0" />
                  {outcome}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Course Curriculum */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold mb-6 flex items-center gap-3"
            >
              <Video className="text-purple-400" />
              Course Curriculum
            </motion.h3>
            <motion.ul className="space-y-4">
              {data?.sections?.map((item, index) => (
                <motion.li 
                  key={index} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-purple-400/30 transition-all"
                >
                  <motion.button
                    className="w-full p-4 flex justify-between items-center font-medium text-white hover:bg-white/5 transition-all duration-300"
                    onClick={() => toggleSection(index)}
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  >
                    <span className="text-left">
                      Section {index + 1}: {item?.title}
                    </span>
                    <motion.div
                      animate={{ rotate: openSection === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaChevronDown />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openSection === index && (
                      <motion.div
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="border-t border-white/10"
                      >
                        <ul className="p-4 space-y-3">
                          {item?.section?.map((lecture, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }}
                              className="p-3 bg-white/5 rounded-lg flex items-center gap-3 text-gray-300 border border-white/5 hover:border-blue-400/30 transition-all cursor-pointer"
                            >
                              <FaPlay className="text-blue-400 text-sm" />
                              {lecture.title}
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Prerequisites */}
          <motion.div 
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 shadow-2xl"
          >
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold mb-6 flex items-center gap-3"
            >
              <Award className="text-orange-400" />
              Prerequisites
            </motion.h3>
            <motion.ul className="space-y-4">
              {data?.prerequisites.map((pre, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-3 text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5 hover:border-orange-400/30 transition-all"
                >
                  <FaClock className="text-orange-400 mt-1 flex-shrink-0" />
                  {pre}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Sidebar */}
        <motion.div 
          variants={itemVariants}
          className="lg:sticky top-20 h-fit max-h-[90vh] overflow-hidden hidden lg:block"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="relative overflow-hidden">
              <motion.img
                src={data?.thumbnail}
                alt={data?.title}
                className="w-full h-64 object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            <div className="p-6">
              <motion.h4 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-bold text-lg mb-4"
              >
                Course Highlights
              </motion.h4>
              
              <div className="space-y-3 text-sm text-gray-300">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <Video className="text-blue-400 flex-shrink-0" size={16} />
                  <span>{data?.sections?.length || 0} Sections</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <FaClock className="text-orange-400 flex-shrink-0" />
                  <span>Lifetime Access</span>
                </motion.div>
                
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-all"
                >
                  <Award className="text-purple-400 flex-shrink-0" size={16} />
                  <span>Certificate of Completion</span>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CourseDetail;