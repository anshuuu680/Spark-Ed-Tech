import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData, setIsAuthenticated } from '../../Features/userDetails';

const ILogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/instructor/login`, { email, password }, { withCredentials: true });
            dispatch(setUserData(response.data.data.instructor));
            dispatch(setIsAuthenticated(true));
            navigate('/instructor/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Please try again.");
        }
    };

    // Function to fill in demo credentials
    const handleDemoLogin = () => {
        setEmail("anshupatidar711@gmail.com");
        setPassword("1122");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold text-center mb-6">Instructor Login</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 transition-colors py-2 rounded-lg font-semibold"
                    >
                        Login
                    </button>
                </form>
                <button
                    onClick={handleDemoLogin}
                    className="w-full bg-gray-600 hover:bg-gray-500 transition-colors py-2 rounded-lg font-semibold mt-4"
                >
                    Demo Login
                </button>
                <p className="text-center text-gray-400 mt-4">
                    Don't have an account? <Link to="/instructor/signup" className="text-blue-500">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default ILogin;
