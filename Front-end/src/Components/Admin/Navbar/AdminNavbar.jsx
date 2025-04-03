import { useState } from "react";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";
import { SiStudyverse } from "react-icons/si";

const AdminNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`bg-dark-card flex flex-col justify-start gap-8 items-center h-full pt-4 text-gray-100 transition-all duration-400 ${isOpen ? 'w-64' : 'w-16'}`}>

            <div className="flex items-center w-full">

                <NavLink
                    to='/'
                    className='text-gray-100 p-2 px-2 w-fit rounded-md flex h-fit gap-5 text-sm hover:text-blue-700'
                >
                    <SiStudyverse style={{ color: "green", fontSize: "2.1rem" }} />

                    {isOpen && <span className="text-gray-100 leading-4 font-semibold" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Unlocking <br /> <span className="font-bold" style={{ color: "#216666" }}>Potential</span></span>
                    }
                </NavLink>
            </div>

            <div className="w-full h-2/3 flex flex-col items-center gap-3">

                <div onClick={() => setIsOpen(!isOpen)} className={`h-20 p-1 flex items-center ${isOpen ? 'justify-end w-full pr-6' : 'justify-center w-16'}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-8 h-8 cursor-pointer"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <NavLinks isOpen={isOpen} />
                </div>
            </div>
        </div>
    );
};

export default AdminNavbar;
