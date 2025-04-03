import { Outlet } from "react-router-dom";
import HeaderUni from "../Header/HeaderUni";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

function HomeLayout() {
  return (
    <div className="w-full min-h-fit bg-gray-900 overflow-hidden">
      <HeaderUni />

    <div className="h-fit w-full">
      <Outlet/>
    </div>
     

     
      <footer className="bg-dark-background text-gray-300 py-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-3">Spark</h3>
            <p className="text-sm text-gray-400">
              Unlock your potential with expert-led courses and a thriving community of learners.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
            <ul className="text-sm space-y-2">
              <li><a href="/courses" className="hover:text-teal-400">Courses</a></li>
              <li><a href="/community" className="hover:text-teal-400">Community</a></li>
              <li><a href="/about" className="hover:text-teal-400">About</a></li>
              <li><a href="/contact" className="hover:text-teal-400">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-blue-500"><FaFacebookF /></a>
              <a href="#" className="hover:text-blue-400"><FaTwitter /></a>
              <a href="#" className="hover:text-blue-600"><FaLinkedinIn /></a>
              <a href="#" className="hover:text-pink-500"><FaInstagram /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Spark. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default HomeLayout;
