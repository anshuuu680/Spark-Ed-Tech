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
import { useDispatch, useSelector } from "react-redux";
import { setUserData, selectUserData } from "../../Features/userDetails";

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
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, { withCredentials: true });
      dispatch(setUserData({}));
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  const renderNavLinks = () => (
    <ul className="flex flex-col gap-3">
      {navLinks.map((link, index) => {
        const isActive = location.pathname.split("/")[2] === link.to.split("/")[1];
        const baseStyles = "transition-all p-2 rounded-md flex items-center gap-3";
        const activeStyles = "bg-blue-600 text-white";
        const hoverStyles = "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-white";

        if (link.to === "/logout") {
          return (
            <li key={index}>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMenu();
                }}
                className={`${baseStyles} ${hoverStyles} w-full text-left`}
              >
                <link.icon className="text-xl" />
                <span>Logout</span>
              </button>
            </li>
          );
        }

        return (
          <li key={index}>
            <NavLink
              to={`/users${link.to}`}
              onClick={toggleMenu}
              className={`${baseStyles} ${isActive ? activeStyles : hoverStyles}`}
            >
              <link.icon className="text-xl" />
              <span>{link.to.split("/")[1].replace("-", " ").replace(/^\w/, c => c.toUpperCase())}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Main Header */}
      <header className="w-full flex items-center justify-between px-5 bg-white dark:bg-dark-card  py-3 shadow-md border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4 lg:gap-8 lg:px-8">
          <Menu className="text-2xl cursor-pointer dark:text-white lg:hidden" onClick={toggleMenu} />
          <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
           
          </Link>
        </div>
        <div className="flex items-center gap-4 lg:gap-6 pr-4">
          <ThemeToggle />
          <NavLink to="/my-account/my-profile" className="w-9 h-9 rounded-full overflow-hidden">
            <img src={userData?.avatar} alt="Avatar" className="w-full h-full object-cover" />
          </NavLink>
        </div>
      </header>

      <aside className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-dark-card shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 z-50`}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
            <SiStudyverse className="text-2xl text-teal-600 dark:text-teal-400" />
            <span className="leading-tight">
              Unlocking<br />
              <span className="text-teal-600 dark:text-teal-400">Potential</span>
            </span>
          </Link>
          <X className="text-2xl cursor-pointer dark:text-white" onClick={toggleMenu} />
        </div>
        <nav className="p-4">
          <h2 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-300">Student Panel</h2>
          {renderNavLinks()}
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu}></div>}
    </>
  );
};

export default Header;