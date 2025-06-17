import { NavLink } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

const PasswordChanged = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[90%] max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col gap-8 shadow-xl"
      >
        <h1 className="text-xl md:text-2xl font-semibold text-white">
          Your password has been changed successfully.
        </h1>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <NavLink to="/login">
            <Button className="px-10 py-3 text-lg bg-blue-600 hover:bg-blue-500 text-white rounded-lg">
              Login
            </Button>
          </NavLink>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PasswordChanged;
