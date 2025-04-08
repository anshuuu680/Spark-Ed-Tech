import { useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setIsAuthenticated } from "@/Features/userDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState("");
    const { userData } = useSelector(selectUserData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleVerifyOtp = async () => {
        try {
            const response = await axios.post('https://spark-ed-tech.onrender.com/api/verify-otp', { email: userData?.email, otp });
            if (response.status === 200) {
                dispatch(setIsAuthenticated(true));
                navigate("/");
            }
        } catch (error) {
            console.error('Failed to verify OTP', error);
            setError("Invalid OTP. Please try again.");
        }
    };

    return (
        <div className="w-full h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
            <div className='flex flex-col items-center gap-4 border p-8 rounded-lg border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-dark-background'>
                <p className="text-gray-600 dark:text-gray-400 text-sm">OTP has been sent to your account, please check your email.</p>
                <h1 className="text-lg text-center font-semibold text-gray-800 dark:text-gray-100">Enter OTP</h1>
                <div className="flex justify-center gap-2">
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                        required
                    />
                </div>
                <Button
                    className="mt-4 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    onClick={handleVerifyOtp}
                >
                    Verify OTP
                </Button>
                {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
        </div>
    );
}

export default VerifyOtp;
