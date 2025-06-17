import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../ui/button";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Features/userDetails';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [buttonColor, setButtonColor] = useState('bg-blue-600');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmitEmail = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/send-otp`,
        { email },
        { withCredentials: true }
      );
      if (response.status === 200) {
        setOtpSent(true);
        setButtonColor('bg-green-600');
      }
    } catch (error) {
      console.error('Failed to send OTP', error);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        "https://spark-ed-tech.onrender.com/api/verify-otp",
        { email, otp }
      );
      if (response.status === 200) {
        setOtpVerified(true);
      }
    } catch (error) {
      console.error('Failed to verify OTP', error);
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        "https://spark-ed-tech.onrender.com/api/reset-password",
        { email, password: newPassword }
      );
      setSuccess("Password reset successfully!");
      setError("");
      navigate("/password-changed");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred while resetting the password");
      setSuccess("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-white/10 text-white rounded-2xl p-6 shadow-xl"
      >
        {!otpSent ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-center">Reset Password</h1>
            <p className="text-sm text-gray-300 text-center">
              Enter your verified email and we'll send you an OTP.
            </p>
            <input
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
            />
            <motion.div whileTap={{ scale: 0.98 }} className="flex justify-end">
              <Button onClick={handleSubmitEmail} className={`w-fit ${buttonColor} text-white`}>
                Submit
              </Button>
            </motion.div>
          </div>
        ) : otpVerified ? (
          <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
            <h1 className="text-xl font-semibold text-center">Reset Password</h1>
            <p className="text-sm text-gray-300 text-center">Enter a new password below.</p>

            <div>
              <label className="text-sm text-gray-300">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                required
              />
            </div>
            <div>
              <label className="text-sm text-gray-300">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white">
              Reset Password
            </Button>
          </form>
        ) : (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-gray-300 text-center">
              OTP has been sent. Please check your email.
            </p>
            <h1 className="text-lg font-semibold text-center">Enter OTP</h1>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/10 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400"
              placeholder="Enter OTP"
              required
            />
            <Button
              onClick={handleVerifyOtp}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-500 text-white"
            >
              Verify OTP
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
