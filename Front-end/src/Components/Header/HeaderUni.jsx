import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SiStudyverse } from "react-icons/si";
import { useSelector } from "react-redux";
import { selectUserData, setUserData } from "@/Features/userDetails";
import axios from "axios";

const HeaderUni = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { userData } = useSelector(selectUserData);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://spark-ed-tech.onrender.com/api/user-data");
        if (response.status === 200) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error fetching authentication data:", error);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

 

  const handleLogout = async () => {
    try {
      await axios.get(`https://spark-ed-tech.onrender.com/api/logout`);
     
      setIsAuthenticated(false);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo-container w-35 flex justify-center gap-1 items-center text-gray-900 dark:text-white">
          <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white">
            <SiStudyverse className="text-gray-900 dark:text-white" style={{ fontSize: "2.1rem" }} />
            <span className="text-sm">
              Unlocking <br />
              <span className="text-teal-600 dark:text-teal-400">Potential</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/courses" className="hover:text-gray-300">Courses</Link>
              <div className="px-2 border border-[#646262] rounded-md flex items-center font-semibold text-[#ecebeb] gap-2 hover:bg-[#ecebeb] hover:text-black hover:cursor-pointer transition duration-400 ease-in-out group py-2">
                <Link to="/users/dashboard">My Classroom</Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="fill-current text-[#ecebeb] group-hover:text-black transition duration-400 ease-in-out"
                  width="23.052"
                  height="15.022"
                >
                  <circle cx="11.052" cy="13.022" r="1.5" />
                  <path d="M11.019 4a7.061 7.061 0 0 1 6.213 3.76l-1.842.756 5.428 2.248 2.234-5.394-2.1.861A11.026 11.026 0 0 0 0 10.982h4A7.008 7.008 0 0 1 11.019 4z" />
                </svg>
              </div>
              <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/" className="hover:text-gray-300">Home</Link>
              <Link to="/courses" className="hover:text-gray-300">Courses</Link>
              <Link to="/about" className="hover:text-gray-300">About</Link>
              <Link to="/contact" className="hover:text-gray-300">Contact</Link>
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Login</Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setIsOpen(false)}>
          <div className="w-64 bg-gray-800 text-white h-full shadow-lg p-5 flex flex-col space-y-6" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-4 top-4" onClick={() => setIsOpen(false)}>
              <X size={24} />
            </button>
            <nav className="flex flex-col space-y-4 mt-10 text-center">
              {isAuthenticated ? (
                <>
                  <Link to="/courses" className="hover:text-gray-300">Courses</Link>
                  <div className="px-2 border border-[#646262] rounded-md flex items-center font-semibold text-[#ecebeb] gap-2 hover:bg-[#ecebeb] hover:text-black hover:cursor-pointer transition duration-400 ease-in-out group py-2">
                    <Link to="/users/dashboard">My Classroom</Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-current text-[#ecebeb] group-hover:text-black transition duration-400 ease-in-out"
                      width="23.052"
                      height="15.022"
                    >
                      <circle cx="11.052" cy="13.022" r="1.5" />
                      <path d="M11.019 4a7.061 7.061 0 0 1 6.213 3.76l-1.842.756 5.428 2.248 2.234-5.394-2.1.861A11.026 11.026 0 0 0 0 10.982h4A7.008 7.008 0 0 1 11.019 4z" />
                    </svg>
                  </div>
                  <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-500">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-gray-300">Home</Link>
                  <Link to="/courses" className="hover:text-gray-300">Courses</Link>
                  <Link to="/about" className="hover:text-gray-300">About</Link>
                  <Link to="/contact" className="hover:text-gray-300">Contact</Link>
                  <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500">Login</Link>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderUni;
