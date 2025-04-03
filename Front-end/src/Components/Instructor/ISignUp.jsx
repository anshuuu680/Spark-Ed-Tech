import { useState } from "react";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setUserData } from '../../Features/userDetails.jsx';
import { Link, useNavigate } from "react-router-dom";

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

    // Append only non-null values
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("/api/instructor/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        dispatch(setUserData(response?.data.data));
        navigate("/instructor/verify-otp");
        setSuccess(response.data.message || "Account created successfully!");
      } else {
        setError('Signup failed');
      }
    } catch (err) {
      console.error("Signup Error:", err.response || err);
      setError(err.response?.data?.message || "Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Instructor Sign Up</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Section */}
          <div className="space-y-4">
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="text" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="text" name="experience" value={formData.experience} onChange={handleChange} placeholder="Years of Experience" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <input type="text" name="degree" value={formData.degree} onChange={handleChange} placeholder="Highest Degree" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
          </div>

          {/* Right Section */}
          <div className="space-y-4 flex flex-col">
            {/* Avatar Upload & Preview */}
            <div className="flex flex-col items-center">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-24 h-24 rounded-full border-2 border-gray-500 object-cover mb-2" />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-500 flex items-center justify-center text-gray-400 mb-2">
                  No Image
                </div>
              )}
              <input type="file" name="avatar" accept="image/*" onChange={handleFileChange} className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            </div>

            <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none h-24" required></textarea>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-3 bg-gray-700 border border-gray-600 rounded focus:outline-none" required />
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded transition duration-300 mt-auto" disabled={loading}>
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </div>
        </form>
        <p className="text-center text-gray-400 mt-4">
         Already have an account? <Link to="/instructor/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default ISignUp;
