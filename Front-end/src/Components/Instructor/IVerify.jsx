import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserData, setIsAuthenticated } from "@/Features/userDetails.jsx";
import { useNavigate } from "react-router-dom";

const IVerify = () => {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { userData } = useSelector(selectUserData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const email = userData?.email;

    const handleChange = (e) => {
        const { value } = e.target;
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 6) {
            setError("OTP must be 6 digits.");
            return;
        }

        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/instructor/verify-otp`, { email, otp }, { withCredentials: true });
            dispatch(setIsAuthenticated(true));
            navigate("/instructor/dashboard");
            setSuccess(response.data.message || "OTP Verified Successfully!");
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
                <p className="text-center text-gray-400 mb-4">OTP has been sent to <span className="text-blue-400">{email}</span></p>

                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        value={otp}
                        onChange={handleChange}
                        placeholder="Enter OTP"
                        maxLength="6"
                        className="w-full text-center text-xl tracking-widest p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none"
                        required
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default IVerify;
