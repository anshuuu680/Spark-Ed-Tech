import React from 'react';
import { NavLink, useLocation, useNavigate, } from 'react-router-dom';
import { selectUserData, setUserData } from '../../Features/userDetails';
import { useDispatch, useSelector } from "react-redux";
import { FiUser, FiEdit, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import axios from 'axios';



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
            await axios.get(`https://spark-ed-tech.onrender.com/api/logout`);
            dispatch(setUserData({}));
            navigate('/')

        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };


    const commonClassName = 'text-white transition-all duration-300 p-1.5 rounded-md flex gap-5 items-center w-full';

    const renderNavLinks = () => {
        return (
            <ul className="flex flex-col gap-1 w-full">
                {navLinks.map((link, index) => {
                    const isActive = location.pathname.split('/')[2] === link.to.split('/')[0];

                    return (
                        <li key={index} className="flex items-center w-full rounded-md hover:bg-green-900 transition duration-900 ease-out">
                            <NavLink
                                to={`${link.to}`}
                                className={`${commonClassName} ${isActive ? 'bg-green-900' : ''}`}
                            >
                                <link.icon className="text-lg text-gray-100" />
                                <h4 className='font-medium text-gray-100'>{link.name}</h4>
                            </NavLink>
                        </li>
                    );
                })}
                <li className="flex items-center w-full rounded-md hover:bg-green-800 transition duration-900 ease-out cursor-pointer">
                    <div onClick={handleLogout}>
                        <div className={`${commonClassName} `}>
                            <FiLogOut className='text-lg text-gray-100' />

                            <h4 className='text-gray-100 font-medium'>Logout</h4>
                        </div>
                    </div>
                </li>
            </ul>
        );
    };

    return (
        <section className="bg-dark-card px-2 py-4 w-80 h-fit rounded-md flex flex-col gap-4">

            <div className="w-full flex gap-4">

                <div style={{ borderRadius: "50% 20% / 10% 40%" }} className="w-20 h-20">
                    <img
                        style={{ borderRadius: "50% 20% / 10% 40%" }}
                        className="h-full w-full object-fill"
                        src={userData?.avatar}
                        alt="Profile"
                    /></div>
                <div className="font-semibold text-[#e4e0e0]">
                    <h3 className="text-lg">{userData?.fullName}</h3>
                    <p className="text-sm text-gray-500">@{userData?.username}</p>
                </div>




            </div>
            <hr style={{ borderColor: '#616060', borderStyle: 'solid' }} />

            <nav className="flex flex-col">
                {renderNavLinks()}
            </nav>



        </section>
    )
}
export default ProfileNavbar