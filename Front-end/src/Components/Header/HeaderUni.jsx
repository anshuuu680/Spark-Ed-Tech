import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SiStudyverse } from "react-icons/si";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated, setIsAuthenticated, setUserData } from "@/Features/userDetails";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const HeaderUni = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user-data`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          dispatch(setUserData(response.data.data));
          dispatch(setIsAuthenticated(true));
        }
      } catch (error) {
        console.error("Error fetching authentication data:", error);
        dispatch(setIsAuthenticated(false));
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, {
        withCredentials: true,
      });

      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-gray-900/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo-container"
          >
            <Link to="/" className="flex items-center gap-2 group">
              <SiStudyverse className="text-3xl text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">Unlocking</span>
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                  Potential
                </span>
              </div>
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {isAuthenticated ? (
              <>
                <Link to="/courses" className="nav-link">Courses</Link>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Link
                    to="/users/dashboard"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                  >
                    <span>My Classroom</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="nav-link text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                ))}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
                  >
                    Login
                  </Link>
                </motion.div>
              </>
            )}
          </nav>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed right-0 top-0 w-64 h-full bg-gray-900 shadow-xl z-50 p-6"
            >
              <div className="flex justify-end mb-8">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="text-white"
                >
                  <X size={24} />
                </motion.button>
              </div>
              <nav className="flex flex-col space-y-6">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/courses"
                      className="text-white hover:text-primary transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      Courses
                    </Link>
                    <Link
                      to="/users/dashboard"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      My Classroom
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-300"
                    >
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <>
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="text-white hover:text-primary transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to="/login"
                        className="block px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                    </motion.div>
                  </>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderUni;
