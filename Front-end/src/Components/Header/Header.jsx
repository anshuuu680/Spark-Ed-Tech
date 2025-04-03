import { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { SiStudyverse } from "react-icons/si";
import { Menu, X, LogOut } from "lucide-react";
import { LuLayoutDashboard } from "react-icons/lu";
import { TbBrandFeedly } from "react-icons/tb";
import { RiTaskLine } from "react-icons/ri";
import { FiMessageSquare } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import { MdSchool } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Features/userDetails";
import { useSelector } from "react-redux";
import { selectUserData } from "../../Features/userDetails";

const navLinks = [
  { to: "/dashboard", icon: LuLayoutDashboard },
  { to: "/feed", icon: TbBrandFeedly },
   { to: "/my-courses", icon: MdSchool },
  { to: "/tasks", icon: RiTaskLine },
  { to: "/chat", icon: FiMessageSquare },
  { to: "/logout", icon: LogOut },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
const { userData } = useSelector(selectUserData);


  const handleLogout = async () => {
    try {
      await axios.get(`/api/logout`);
      dispatch(setUserData({}));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderNavLinks = () => (
    <ul className="flex flex-col gap-2">
      {navLinks.map((link, index) => {
        const isActive = location.pathname.split("/")[2] === link.to.split("/")[1];
        const commonClassName = "transition-all duration-300 p-2 rounded-md text-gray-700 dark:text-white";
        const activeClassName = "bg-blue-700 w-full dark:bg-blue-700 text-blue-100 dark:text-white";
        const hoverClassName = "hover:bg-gray-200 dark:hover:bg-gray-800";

        if (index === 5) {
          return (
            <li key={index} onClick={() => { handleLogout(); toggleMenu(); }} className="flex items-center cursor-pointer">
              <span className={`${commonClassName} flex gap-4 items-center font-semibold ${isActive ? activeClassName : hoverClassName}`}>
                <link.icon className="text-3xl" />
                <h1 className="text-[18px]">Logout</h1>
              </span>
            </li>
          );
        }

        return (
          <li key={index}>
            <NavLink
              to={`/users${link.to}`}
              className={`flex items-center gap-3 font-semibold ${commonClassName} ${isActive ? activeClassName : hoverClassName}`}
              onClick={toggleMenu} // Close menu when clicked
            >
              <link.icon className="text-3xl" />
              <h1 className="text-[18px]">
                {link.to.split("/")[1].charAt(0).toUpperCase() + link.to.split("/")[1].slice(1)}
              </h1>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );


  return (
    <>
      {/* Main Header */}
      <section className="w-full px-3 lg:px-0 flex items-center justify-between bg-white dark:bg-dark-card py-3 shadow-md border-b border-gray-200 dark:border-none">
        <div className="flex lg:px-24 gap-4 lg:gap-8 w-1/2 items-center">
          {/* Mobile Menu Icon */}
          <Menu className="text-3xl cursor-pointer dark:text-gray-100 lg:hidden" onClick={toggleMenu} />

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
        </div>

        {/* Right Section */}
        <div className="header-right flex items-center justify-between gap-4 lg:gap-6 min-h-fit lg:px-8 lg:pr-32">
          <ThemeToggle />
          <NavLink to={'/my-account/my-profile'} className="w-8 h-8   rounded-full overflow-hidden cursor-pointer">
            <img className="w-full h-full object-fit" src={userData?.avatar} alt="" />
          </NavLink>
        </div>
      </section>

      {/* Sidebar Navbar (Desktop) */}


      {/* Sidebar Navbar (Mobile) */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-card shadow-lg transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}>
        {/* Close Button */}
        <div className="p-4 flex justify-between items-center">
          <div className="logo-container w-35 flex justify-center gap-1 items-center text-gray-900 dark:text-white">
            <Link to="/" className="flex items-center gap-2 text-gray-900 dark:text-white">
              <SiStudyverse className="text-gray-900 dark:text-white" style={{ fontSize: "2.1rem" }} />
              <span className="text-sm">
                Unlocking <br />
                <span className="text-teal-600 dark:text-teal-400">Potential</span>
              </span>
            </Link>
          </div>
          <X className="text-3xl cursor-pointer dark:text-gray-100" onClick={toggleMenu} />
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col p-4 space-y-4">
          <h1 className="text-lg text-gray-500">Student Panel</h1>
          {renderNavLinks()}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;
