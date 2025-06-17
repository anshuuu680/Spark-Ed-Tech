import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setIsAuthenticated } from "@/Features/userDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { userData } = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/verify-otp`,
        { email: userData?.email, otp },
        { withCredentials: true }
      );

      if (response.status === 200) {
        dispatch(setIsAuthenticated(true));
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to verify OTP", error);
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-[90%] max-w-md bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl p-8 text-center flex flex-col gap-6 shadow-xl"
      >
        <p className="text-sm text-gray-300">
          OTP has been sent to your account, please check your email.
        </p>
        <h1 className="text-xl font-semibold text-white">Enter OTP</h1>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter your OTP"
          className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-white/10 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition"
            onClick={handleVerifyOtp}
          >
            Verify OTP
          </Button>
        </motion.div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </motion.div>
    </div>
  );
};

export default VerifyOtp;
