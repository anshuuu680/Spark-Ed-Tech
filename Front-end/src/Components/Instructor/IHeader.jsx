import {  FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function IHeader() {
  return (
    <header className="flex w-full h-16 items-center justify-end bg-gray-900 text-white p-4 shadow-md px-10 pl-4">
      {/* Logo */}
      
      
      {/* Right-side elements */}
      <div className="flex items-center gap-4">
       
        <FaUserCircle className="text-2xl cursor-pointer hover:text-gray-400" />
      
      </div>
    </header>
  );
}

export default IHeader;
