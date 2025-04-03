import { useState } from "react";
import Modal from "react-modal";
import MyPosts from "./MyPosts";
import MyQuestions from "./MyQuestions";
import SavedPosts from "./SavedPosts";
import EditProfile from "./EditProfile"; 
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";

// Set modal root (this should be in your main entry file)
Modal.setAppElement("#root");

const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {userData} = useSelector(selectUserData)

  return (
    <div className="w-full min-h-screen mx-auto p-4 bg-white dark:bg-dark-background">
      {/* Profile Header */}
      <div className="flex items-center gap-4 border-b pb-4 text-gray-300">
        <img src={userData?.avatar} alt="Profile" className="w-20 h-20 rounded-full" />
        <div>
          <h2 className="text-xl font-bold">{userData?.fullName}</h2>
          <p className="text-gray-600">@{userData?.username}</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-around mt-4 border-b pb-2">
        {["posts", "questions", "saved"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 ${activeTab === tab ? "border-b-2 border-blue-500 text-blue-500" : "text-gray-600"
              }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Content Section */}
      <div className="mt-4">
        {activeTab === "posts" && <MyPosts />}
        {activeTab === "questions" && <MyQuestions />}
        {activeTab === "saved" && <SavedPosts />}
      </div>

      {/* Modal for Edit Profile */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Edit Profile"
        className="w-full max-w-[90vw] md:max-w-[60vw] lg:max-w-[50vw] bg-dark-card shadow-lg rounded-md outline-none md:p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center md:items-center " // Adjust `pt-[4rem]` to match header height
      >
        <EditProfile  closeModal={() => setIsModalOpen(false)} />
      </Modal>

    </div>
  );
};

export default MyProfile;
