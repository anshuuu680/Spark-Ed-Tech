import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { selectUserData, setUserData } from '../../Features/userDetails';
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiEdit, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { motion } from 'framer-motion';

const ProfileNavbar = () => {
    const { userData } = useSelector(selectUserData);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navLinks = [
        { name: 'My profile', to: 'my-profile/posts', icon: FiUser },
        { name: 'Edit profile', to: 'edit-profile', icon: FiEdit },
        { name: 'My purchase', to: 'my-purchase', icon: FiShoppingCart },
    ];

    const handleLogout = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/logout`, { withCredentials: true });
            dispatch(setUserData({}));
            navigate('/')
        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    const renderNavLinks = () => {
        return (
            <ul className="flex flex-col gap-1 w-full">
                {navLinks.map((link, index) => {
                    const isActive = location.pathname.split('/')[2] === link.to.split('/')[0];

                    return (
                        <motion.li
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full"
                        >
                            <NavLink
                                to={`${link.to}`}
                                className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive 
                                        ? 'bg-primary/10 text-primary' 
                                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                            >
                                <link.icon className="text-xl" />
                                <span className="text-sm font-medium">{link.name}</span>
                            </NavLink>
                        </motion.li>
                    );
                })}
                <motion.li
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                >
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                    >
                        <FiLogOut className="text-xl" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </motion.li>
            </ul>
        );
    };

    return (
        <section className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm w-80">
            <div className="p-6">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-primary/20">
                            <img
                                className="h-full w-full object-cover"
                                src={userData?.avatar}
                                alt="Profile"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-white dark:border-gray-900"></div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {userData?.fullName}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            @{userData?.username}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-2">
                <div className="h-px bg-gray-200 dark:bg-gray-800"></div>
            </div>

            <nav className="p-4">
                {renderNavLinks()}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">SE</span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">Spark Ed</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">v1.0.0</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProfileNavbar;