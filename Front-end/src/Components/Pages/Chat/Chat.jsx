import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import { useSocket } from "@/SocketContext";

Modal.setAppElement("#root");

const Chat = () => {
    const location = useLocation();
    const socket = useSocket();
    const { userData } = useSelector(selectUserData);
    const [hasContent, setHasContent] = useState(location.pathname.split("/")[3] || false);
    const [chats, setChats] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [flag, setFlag] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        setHasContent(location.pathname.split("/")[3] || false);
    }, [location.pathname]);

    useEffect(() => {
        if (socket) {
            socket.emit("chat", userData);
            socket.on("all-conversations", (conversations) => {
                const chatData = conversations?.map((data) => ({
                    ...data,
                    userDetails: data?.to._id === userData?._id ? data?.from : data?.to,
                }));
                setChats(chatData);
            });

            socket.on("received message", () => {
                setFlag(!flag);
            });
        }
    }, [socket, userData?._id, flag, location.pathname]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/all-users");
                setUsers(response.data.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);

    const handleStartChat = async (user) => {
        try {
            const response = await axios.post("/api/start-chat", {
                from: userData?._id,
                to: user._id,
            });
            closeModal();
            setChats((prevChats) => [...prevChats, response.data.chat]);
        } catch (error) {
            console.error("Error starting chat:", error);
        }
    };

    useEffect(() => {
        const darkModeListener = (e) => setIsDarkMode(e.matches);
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", darkModeListener);
        return () => {
            window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", darkModeListener);
        };
    }, []);

    return (
        <div className="w-full h-screen flex flex-col md:flex-row md:p-4 gap-4 overflow-hidden">
            {/* Chat List */}
            <div className={`w-full md:w-1/3 h-full flex flex-col shadow-md rounded-lg p-4 py-8 overflow-hidden ${hasContent ? "hidden md:flex" : ""}`}>

                <div className="flex justify-between items-center mb-4">

                    <h1 className="font-semibold text-lg text-gray-800 dark:text-gray-100">Messages</h1>
                    <button
                        onClick={openModal}
                        className="px-4 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
                    >
                        New Chat
                    </button>
                </div>
                <div className="w-full flex-1 overflow-y-auto">
                    {chats.length === 0 ? (
                        <div className="text-gray-600 dark:text-gray-300 text-center flex items-center justify-center h-full">
                            No conversations yet.
                        </div>
                    ) : (
                        chats.map((chat, index) => {
                            const isActive = location.pathname.includes(chat.userDetails?._id);
                            return (
                                <NavLink
                                    key={index}
                                    to={`/users/chat/${chat.userDetails?._id}`}
                                    className={`flex justify-between items-center p-3 rounded-lg cursor-pointer group transition-all
                                        ${isActive ? "bg-blue-500 dark:bg-dark-inside-card" : "hover:bg-gray-200 dark:hover:bg-gray-800"}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <img className="w-12 h-12 rounded-full" src={chat.userDetails?.avatar} alt="Profile" />
                                        <div className="flex flex-col">
                                            <h1 className="font-semibold text-gray-900 dark:text-gray-100">{chat.userDetails?.fullName}</h1>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                {chat.lastMessage?.content?.length > 20
                                                    ? `${chat.lastMessage?.content.slice(0, 20)}...`
                                                    : chat.lastMessage?.content || "No message yet."}
                                            </p>
                                        </div>
                                    </div>
                                    <FaTrash className="text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </NavLink>
                            );
                        })
                    )}
                </div>
            </div>

            {/* Chat Window */}
            <div className={`w-full md:w-2/3 h-screen flex flex-col shadow-md rounded-lg p-4 overflow-hidden ${hasContent ? "flex" : "hidden md:flex"}`}>
                <Outlet />
            </div>

            {/* New Chat Modal */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                className={`p-6 rounded-lg w-full max-w-md mx-auto shadow-lg transition-all
        ${isDarkMode ? "bg-dark-card text-white" : "bg-white text-gray-900"}`}
                overlayClassName="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center px-4"
            >
                <h2 className="text-lg font-semibold mb-4 text-center">Start a New Chat</h2>

                <input
                    type="text"
                    placeholder="Search users..."
                    className="w-full p-3 border rounded-md mb-4 bg-gray-900 dark:bg-gray-800 text-gray-900 dark:text-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div className="max-h-60 overflow-y-auto">
                    {users
                        .filter((user) => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
                        .slice(0, 5)
                        .map((user) => (
                            <div
                                key={user._id}
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-800 rounded-md transition"
                                onClick={() => handleStartChat(user)}
                            >
                                <NavLink onClick={closeModal} to={`/users/chat/${user?._id}`} className="flex items-center gap-3">
                                  
                                    <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full" />
                                    <p className="text-sm md:text-base">{user.fullName}</p>
                                </NavLink>
                            </div>
                        ))}
                </div>

                <button
                    onClick={closeModal}
                    className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                >
                    Close
                </button>
            </Modal>

        </div>
    );
};

export default Chat;
