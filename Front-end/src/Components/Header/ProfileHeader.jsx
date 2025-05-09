import { SiStudyverse } from "react-icons/si"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";

const customStyles = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '0.4rem',
    color: 'white',
};

const ProfileHeader = () => {
    const {userData} = useSelector(selectUserData)
    return (
        <section className=" w-full flex items-center justify-between bg-dark-card py-3 md:px-24 px-4">
            <div className="logo-container w-35 flex justify-center gap-1 items-center text-white">
               
            </div>
            <div className="flex gap-4">
                <div className="px-2 border text-sm border-[#646262] rounded-md flex items-center font-base text-[#ecebeb] gap-2 hover:bg-[#ecebeb] hover:text-black hover:cursor-pointer transition duration-400 ease-in-out group py-2">
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

                <div className="hidden md:block profile w-10 h-10 rounded-full cursor-pointer"
                >
                    <img
                        className="h-full w-full rounded-full"
                        src={userData?.avatar}
                        alt="Profile"
                    />
                </div>
            </div>
        </section>

    )
}
export default ProfileHeader