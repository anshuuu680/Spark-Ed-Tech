import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../../Features/userDetails.jsx";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ISignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    dob: "",
    address: "",
    experience: "",
    degree: "",
    avatar: null,
    bio: "",
    password: "",
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avatar: file });
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) formDataToSend.append(key, value);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/instructor/register`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        dispatch(setUserData(response.data.data));
        navigate("/instructor/verify-otp");
        setSuccess(response.data.message || "Account created successfully!");
      } else {
        setError("Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-xl p-6 md:p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-6">Create Instructor Account</h2>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-center mb-4"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-green-500 text-center mb-4"
          >
            {success}
          </motion.p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-4">
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "mobile", placeholder: "Mobile" },
              { name: "dob", placeholder: "", type: "date" },
              { name: "address", placeholder: "Address" },
              { name: "experience", placeholder: "Years of Experience" },
              { name: "degree", placeholder: "Highest Degree" },
            ].map(({ name, placeholder, type = "text" }) => (
              <input
                key={name}
                name={name}
                type={type}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none text-white placeholder-gray-400 text-sm"
                required
              />
            ))}
          </div>

          {/* Right Section */}
          <div className="space-y-4 flex flex-col">
            <div className="flex flex-col items-center">
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-white/20 mb-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 border border-white/10 flex items-center justify-center text-sm text-gray-400 mb-2">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full p-2 text-sm text-gray-300 bg-white/5 border border-white/10 rounded-lg"
                required
              />
            </div>

            <textarea
              name="bio"
              placeholder="Bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 text-sm h-24 resize-none"
              required
            ></textarea>

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 text-sm"
              required
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 rounded-lg transition duration-200 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </motion.button>
          </div>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link to="/instructor/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ISignUp;
