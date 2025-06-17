import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LuLayoutDashboard } from 'react-icons/lu';
import { TbBrandFeedly } from 'react-icons/tb';
import { RiTaskLine } from 'react-icons/ri';
import { FiMessageSquare } from 'react-icons/fi';
import { LogOut } from 'lucide-react';
import { useDispatch } from "react-redux";
import { MdSchool } from "react-icons/md";
import { setUserData } from '../../Features/userDetails';
import axios from 'axios';
import { motion } from 'framer-motion';

const navLinks = [
  { to: '/dashboard', icon: LuLayoutDashboard, label: 'Dashboard' },
  { to: '/feed', icon: TbBrandFeedly, label: 'Feed' },
  { to: "/my-courses", icon: MdSchool, label: 'Courses' },
  { to: '/tasks', icon: RiTaskLine, label: 'Tasks' },
  { to: '/chat', icon: FiMessageSquare, label: 'Chat' },
  { to: '/logout', icon: LogOut, label: 'Logout' },
];

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, { withCredentials: true });
      dispatch(setUserData({}));
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const renderNavLinks = () => {
    return (
      <ul className="flex flex-col gap-2 w-full">
        {navLinks.map((link, index) => {
          const isActive = location.pathname.split('/')[2] === link.to.split('/')[1];
          const isLogout = index === 5;

          return (
            <motion.li
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center w-full rounded-lg transition-all duration-200 ${
                isActive ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {isLogout ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary"
                >
                  <link.icon className="text-xl" />
                  <span className="text-sm font-medium">{link.label}</span>
                </button>
              ) : (
                <NavLink
                  to={`/users${link.to}`}
                  className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200"
                >
                  <link.icon className="text-xl" />
                  <span className="text-sm font-medium">{link.label}</span>
                </NavLink>
              )}
            </motion.li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className="hidden md:flex flex-col h-full md:py-6 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
      

      
      <nav className="flex-1 px-4 py-2">
        {renderNavLinks()}
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-medium text-primary">SE</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Spark Ed</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
