import React, { useState } from 'react';
import axios from 'axios';
import { Button } from "../ui/button";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Features/userDetails';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [buttonColor, setButtonColor] = useState('bg-blue-500');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmitEmail = async () => {
        try {
            const response = await axios.post('/api/send-otp', { email });
            if (response.status === 200) {
                setOtpSent(true);
                setButtonColor('bg-green-500');
            }
        } catch (error) {
            console.error('Failed to send OTP', error);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('/api/verify-otp', { email, otp });
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
            const response = await axios.post("/api/reset-password", { email, password: newPassword });
            setSuccess("Password reset successfully!");
            setError("");
            navigate("/password-changed");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while resetting the password");
            setSuccess("");
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
            <div className="min-h-[40vh] bg-white dark:bg-dark-card mt-4 py-2 px-6 rounded-lg shadow-lg max-w-md min-w-[40vh] border border-gray-300 dark:border-gray-600 flex flex-col justify-around items-center">
                {!otpSent ? (
                    <>
                        <h1 className="dark:text-gray-100 font-semibold text-xl mb-6 text-center">Reset Password</h1>
                        <p className="dark:text-gray-400">Enter your user account's verified email address and we will send you an OTP.</p>
                        <input
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-gray-200"
                        />
                        <div className='flex justify-end w-full'>
                            <Button
                                className={`w-fit ${buttonColor}`}
                                onClick={handleSubmitEmail}
                            >
                                Submit
                            </Button>
                        </div>
                    </>
                ) : otpVerified ? (
                    <form onSubmit={handleResetPassword} className="min-w-[50vh]">
                        <h1 className="dark:text-gray-100 font-semibold text-xl mb-6 text-center">Reset Password</h1>
                        <p className="text-[#858383] text-sm text-center mb-6 rounded-lg">Please enter your new password below.</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="newPassword" className="dark:text-gray-200 text-sm font-medium">New Password</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmPassword" className="dark:text-gray-200 text-sm font-medium">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-gray-200"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}
                            {success && <p className="text-green-500 text-sm">{success}</p>}
                            <Button type="submit" className="w-full bg-blue-500 text-white">Reset Password</Button>
                        </div>
                    </form>
                ) : (
                    <div className='flex flex-col items-center gap-4'>
                        <p className="dark:text-gray-400 text-sm">OTP has been sent to your account, please check your email.</p>
                        <h1 className="text-lg text-center font-semibold dark:text-gray-100">Enter OTP</h1>
                        <div className="flex justify-center gap-2">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-gray-50 dark:bg-dark-background text-gray-900 dark:text-gray-200"
                                required
                            />
                        </div>
                        <Button
                            className="mt-4 bg-blue-500 text-white"
                            onClick={handleVerifyOtp}
                        >
                            Verify OTP
                        </Button>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
