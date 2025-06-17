import { Outlet } from "react-router-dom";
import HeaderUni from "../Header/HeaderUni";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

function HomeLayout() {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", color: "hover:text-blue-500", label: "Facebook" },
    { icon: <FaTwitter />, href: "#", color: "hover:text-blue-400", label: "Twitter" },
    { icon: <FaLinkedinIn />, href: "#", color: "hover:text-blue-600", label: "LinkedIn" },
    { icon: <FaInstagram />, href: "#", color: "hover:text-pink-500", label: "Instagram" },
  ];

  const quickLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <HeaderUni />
      
      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-dark-background text-gray-300 py-16 mt-auto relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-500 to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <motion.div 
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
            >
              <h3 className="text-3xl font-bold text-white bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
                Spark
              </h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                Unlock your potential with expert-led courses and a thriving community of learners.
              </p>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-white">Quick Links</h3>
              <ul className="space-y-4">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-teal-400 transition-all duration-300 flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-teal-400 mr-0 group-hover:mr-2 transition-all duration-300"></span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="space-y-6"
              initial="initial"
              animate="animate"
              variants={fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold text-white">Follow Us</h3>
              <div className="flex gap-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className={`text-2xl transition-all duration-300 hover:scale-110 ${social.color} p-2 rounded-full hover:bg-gray-800`}
                    aria-label={`Follow us on ${social.label}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="mt-16 pt-8 border-t border-gray-800 text-center"
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} Spark. All rights reserved.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default HomeLayout;
