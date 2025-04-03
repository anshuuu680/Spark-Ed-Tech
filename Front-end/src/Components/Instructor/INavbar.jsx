import { useState } from "react";
import { SiStudyverse } from "react-icons/si";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdDashboard, MdLibraryBooks, MdAddBox, MdPayment, MdLogout } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { setUserData } from "@/Features/userDetails";
import { useDispatch } from "react-redux";

const links = [
    { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
    { name: "Courses", path: "/courses", icon: <MdLibraryBooks /> },
    { name: "Create", path: "/create-course", icon: <MdAddBox /> },
    { name: "Payments", path: "/payments", icon: <MdPayment /> },
];

function INavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();
      const navigate = useNavigate();

    

    const handleLogout = async () => {
      
        try {
          const response = await axios.post(`/api/instructor/logout`);
          dispatch(setUserData({}));
          navigate('/');
        } catch (error) {
          console.error("Error logging out:", error.message);
        }
      };

    return (
        <>
            {/* Mobile Navbar */}
            <div className="md:hidden p-4 bg-gray-900 text-white flex justify-between items-center fixed top-0 left-0 w-full z-50">
                <button onClick={() => setIsOpen(true)} className="text-white text-2xl">
                    <FiMenu />
                </button>
                <FaUserCircle className="text-2xl" />
            </div>

            {/* Mobile Sidebar & Backdrop */}
            <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={() => setIsOpen(false)}></div>

                {/* Sidebar */}
                <div className={`fixed top-0 left-0 w-64 bg-gray-900 text-gray-100 h-full flex flex-col transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                    {/* Logo & Close Button */}
                    <div className="p-4 flex items-center justify-between">
                        <Link to="/" className="flex items-center gap-2 text-white">
                            <SiStudyverse className="text-teal-400 text-3xl" />
                            <span className="text-sm leading-tight">
                                Unlocking <br />
                                <span className="text-teal-400">Potential</span>
                            </span>
                        </Link>
                        <button onClick={() => setIsOpen(false)} className="text-white text-2xl">
                            <FiX />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex flex-col mt-4 space-y-2">
                        {links.map((link, index) => (
                            <NavLink
                                key={index}
                                to={`/instructor${link.path}`}
                                className={({ isActive }) =>
                                    `flex items-center gap-4 px-6 py-3 text-lg transition-all ${
                                        isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
                                    }`
                                }
                                onClick={() => setIsOpen(false)}>
                                {link.icon} <span className="block">{link.name}</span>
                            </NavLink>
                        ))}
                        <NavLink
                          
                            className="flex items-center gap-4 px-6 py-3 text-lg transition-all hover:bg-gray-800"
                            onClick={handleLogout}>
                            <MdLogout /> <span className="block">Logout</span>
                        </NavLink>
                    </nav>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex flex-col w-52 min-h-screen bg-gray-900 text-gray-100">
                <div className="p-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-white">
                        <SiStudyverse className="text-teal-400 text-3xl" />
                        <span className="text-sm leading-tight hidden md:block">
                            Unlocking <br />
                            <span className="text-teal-400">Potential</span>
                        </span>
                    </Link>
                </div>
                <nav className="flex flex-col mt-4 space-y-2">
                    {links.map((link, index) => (
                        <NavLink
                            key={index}
                            to={`/instructor${link.path}`}
                            className={({ isActive }) =>
                                `flex items-center gap-4 px-6 py-3 text-lg transition-all ${
                                    isActive ? "bg-gray-700 text-white" : "hover:bg-gray-800"
                                }`
                            }>
                            {link.icon} <span className="block">{link.name}</span>
                        </NavLink>
                    ))}
                    <NavLink onClick={handleLogout} className="flex items-center gap-4 px-6 py-3 text-lg transition-all hover:bg-gray-800">
                        <MdLogout /> <span className="block">Logout</span>
                    </NavLink>
                </nav>
            </div>
        </>
    );
}

export default INavbar;