import { Button } from "@/Components/ui/button";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { X } from "lucide-react";


const EditProfile = ({closeModal}) => {
  const fileInputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // State for form data and initial form data
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    mobile: "",
    pronouns: "",
    address: "",
    linkedin: "",
    bio: "",
  });

  const [initialFormData, setInitialFormData] = useState({}); // Initial form data
  const [avatar, setAvatar] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user-data");
        const data = response.data.data;

        // Set form data and initial form data with fetched data
        const fetchedData = {
          username: data.username || "",
          fullName: data.fullName || "",
          email: data.email || "",
          mobile: data.mobile || "",
          pronouns: data.pronouns || "",
          address: data.address || "",
          linkedin: data.linkedin || "",
          bio: data.bio || "",
        };

        setFormData(fetchedData);
        setInitialFormData(fetchedData); // Store initial data for comparison
        setAvatar(data.avatar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle changes in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle avatar file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        avatar: file,
      });
      setAvatar(URL.createObjectURL(file));
    }
  };

  // Trigger file input on avatar click
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('/api/update-user', data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.status === 200) {
        toast.success("Profile edited successfully");
        setIsLoading(false);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error updating profile");
    }
  };

  // Function to check if the form data has changed compared to the initial data
  const isFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-dark-card w-full min-h-full p-4">
      <div className="flex justify-between">

      <h1 className="text-gray-100 text-xl font-semibold mb-2">Profile</h1>
     
      <button
        onClick={closeModal} 
        className="p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full"
      >
      <X size={20} />
      </button>
      </div>
  
      <hr className="mt-1" style={{ borderColor: "#616060", borderStyle: "solid" }} />
      <div className="w-full h-full flex flex-col-reverse md:flex-row py-4">
        <div className="flex flex-col w-full md:w-7/12 gap-4 overflow-y-auto no-scrollbar max-h-[40vh]">
          <ul className="flex flex-col w-full">
            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="username">Username</label>
              <input
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                disabled
              />
              <h1 className="text-xs text-gray-500">You cannot change your username.</h1>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="fullName">Name</label>
              <input
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              <h1 className="text-xs text-gray-500">You can change your name any number of times.</h1>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="email">Email</label>
              <input
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
                disabled
              />
              <h1 className="text-xs text-gray-500">You cannot change your email.</h1>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="mobile">Mobile</label>
              <input
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
              <h1 className="text-xs text-gray-500">Changeable.</h1>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="pronouns">Pronouns</label>
              <select
                id="pronouns"
                value={formData.pronouns}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-400 text-gray-100 bg-dark-background focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="He/Him">He/Him</option>
                <option value="She/Her">She/Her</option>
                <option value="Other">Other</option>
              </select>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="address">Address</label>
              <input
                placeholder="221B, New street, Bhopal"
                id="address"
                value={formData.address}
                onChange={handleChange}
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
              />
              <h1 className="text-xs text-gray-500">Changeable.</h1>
            </li>

            <li className="flex flex-col w-full gap-2 px-4 py-2">
              <label className="text-gray-100 font-semibold" htmlFor="linkedin">LinkedIn</label>
              <input
                placeholder="Link"
                id="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
                type="text"
              />
              <h1 className="text-xs text-gray-500">Changeable.</h1>
            </li>


          </ul>
        </div>
        <div className="flex flex-col w-full md:w-5/12 ">
          <h1 className="text-gray-100 font-semibold">Profile Picture</h1>
          <div className="w-full flex flex-col gap-4 items-center mt-2">
            <img
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover"
              src={avatar}
              alt="Avatar"
              onClick={handleImageClick}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <h1 className="text-gray-500 text-sm">Click on image to change profile picture.</h1>
          </div>
          <li className="flex flex-col w-full gap-2 px-4 py-2">
            <label className="text-gray-100 font-semibold" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={handleChange}
              className="bg-dark-background border rounded-md flex items-center px-2 text-gray-100 outline-none border-gray-400 focus:border-blue-600 p-1"
            />
            <h1 className="text-xs text-gray-500">Changeable.</h1>
          </li>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 text-white"
              disabled={!isFormChanged()}  // Disable button if form hasn't changed
            >
              {isLoading ? <span>Saving...</span> : <span>Save Changes</span>}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditProfile;
