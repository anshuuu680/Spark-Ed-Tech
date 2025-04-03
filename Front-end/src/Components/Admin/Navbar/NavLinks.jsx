
import { NavLink, useNavigate } from "react-router-dom";
import { FaTachometerAlt } from 'react-icons/fa';
import { MdBook } from 'react-icons/md';
import { MdAccountCircle } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';
import { BiGroup } from 'react-icons/bi';
import { MdPayment } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../../Features/userDetails";

const navLinks = [
    { to: 'dashboard', icon: FaTachometerAlt },
    { to: 'courses', icon: MdBook },
    { to: 'notifications', icon: IoMdNotifications },
    { to: 'instructors', icon: MdAccountCircle },
    { to: 'transactions', icon: MdPayment },
];


const NavLinks = ({ isOpen }) => {

    const [refreshCount, setRefreshCount] = useState(true);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.get(`/api/admin/logout`);
            dispatch(setUserData({}));
            navigate('/')

        } catch (error) {
            console.error("Error logging out:", error.message);
        }
    };

    return (
        <ul className="flex flex-col gap-3">
            {navLinks.map((link, index) => {
                const isActive = location.pathname === `/admin/${link.to}`;
                const commonClassName = `text-gray-100 transition-all duration-300 p-2 px-2 rounded-md flex items-center font-semibold gap-5 text-sm ${isOpen ? 'w-[15vw]' : 'w-fit'}`;

                return (
                    <li key={index} className="flex items-center">
                        <NavLink onClick={() => setRefreshCount(!refreshCount)}
                            to={`/admin/${link.to}`}
                            className={`${commonClassName} ${isActive ? 'text-gray-700 shadow-xl bg-white' : 'hover:bg-gray-100 hover:text-gray-700'}`}
                        >
                            <link.icon className="text-2xl" />
                            {isOpen && <h1 className="">{link.to.charAt(0).toUpperCase() + link.to.slice(1)}</h1>}
                        </NavLink>
                    </li>
                );
            })}

            <li className="flex items-center">
                <NavLink onClick={handleLogout}
                    to={'/admin/logout'}
                    className='text-red-500 transition-all duration-300 p-2 px-2 w-full rounded-md flex gap-3 hover:bg-gray-100'
                >
                    <FiLogOut className="text-2xl" />
                    {isOpen && <h1 className="">Logout</h1>}
                </NavLink>
            </li>
        </ul>
    )
}
export default NavLinks