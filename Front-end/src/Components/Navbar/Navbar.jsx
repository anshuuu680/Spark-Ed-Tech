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

const navLinks = [
  { to: '/dashboard', icon: LuLayoutDashboard },
  { to: '/feed', icon: TbBrandFeedly },
  { to: "/my-courses", icon: MdSchool },
  { to: '/tasks', icon: RiTaskLine },
  { to: '/chat', icon: FiMessageSquare },
  { to: '/logout', icon: LogOut },
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
      <ul className="flex flex-col gap-5">
        {navLinks.map((link, index) => {
          const isActive = location.pathname.split('/')[2] === link.to.split('/')[1];
          const commonClassName =
            'transition-all duration-300 p-1.5 rounded-md text-gray-700 dark:text-white';

          const activeClassName =
            'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-white';
          const hoverClassName = 'hover:bg-gray-200 dark:hover:bg-gray-800';

          if (index === 5) {
            return (
              <li key={index} onClick={handleLogout} className="flex items-center">
                <NavLink
                  className={`${commonClassName}  ${isActive ? activeClassName : hoverClassName}`}
                >
                  <link.icon className="text-2xl" />
                </NavLink>
              </li>
            );
          }

          return (
            <li key={index} className="flex items-center">
              <NavLink
                to={`/users${link.to}`}
                className={`${commonClassName} font-semibold ${isActive ? activeClassName : hoverClassName}`}
              >
                <link.icon className="text-2xl" />
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <section className="hidden md:inline dark:bg-dark-card bg-white dark:border-gray-700 px-4 py-4 h-full">
      <nav className="flex justify-center items-center">
        {renderNavLinks()}
        <hr className="my-2 border-gray-300 dark:border-gray-500" />
      </nav>
    </section>
  );
};

export default Navbar;
