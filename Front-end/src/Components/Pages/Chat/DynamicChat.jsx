
import { useSelector } from "react-redux";
import { selectUserData } from "@/Features/userDetails";
import { useSocket } from "@/SocketContext";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import EmojiPicker from 'emoji-picker-react';
import ReactModal from 'react-modal';
import ChatNav from "./ChatNav";
import ChatWindow from "./ChatWindow";
import axios from "axios";


ReactModal.setAppElement('#root');

const DynamicChat = () => {
    const { id } = useParams();
    const [status, setStatus] = useState();
    const socket = useSocket();
    const { userData } = useSelector(selectUserData);
    const [user, setUser] = useState();
    const [conversation, setConversation] = useState(null);
    const [message, setMessage] = useState('');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatEndRef = useRef(null);
    const [lastMsg,setLastMsg] = useState(false);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversation]);

    useEffect(() => {


        socket.on("typing", ({ sender }) => {
            if (user?._id === sender) {
                setStatus(true);
            }
        });

        socket.on("stop typing", ({ sender }) => {
            if (user?._id === sender) {
                setStatus(false);
            }
        });

    }, [message, id, user?._id]);

    useEffect(()=>{

        const fetchChat = async ()=>{
            const response = await axios.get(`/api/chat/${id}`);
            setConversation(response?.data.data?.messages);
        }
        fetchChat();

    },[id])



    useEffect(() => {
        if (socket) {
            socket.on("message-user", (user) => {
                setUser(user);
            });
            socket.emit("conversation", id);
            socket.emit("seen", id);

            socket.on("message", ({ messages, conversation }) => {
                if (messages && conversation) {

                    if ((id === conversation?.to) || (id === conversation?.from)){
                        setConversation(messages);
                    }
                }

            });

            socket.on("received message",(msg)=>{
                setLastMsg(!lastMsg);
            });

            return () => {
                socket.off("message-user");
                socket.off("message");
            };
        }
    }, [id, userData, socket,lastMsg]);


    const onEmojiClick = (event) => {
        setMessage((prevMessage) => prevMessage + event.emoji);
    };

    const sendMessage = () => {
        if (message.trim() === '') return;

        const messageData = {
            receiver: id,
            message,
            sender: userData?._id,
        };
        socket.emit('new message', messageData);
        setMessage('');
    };

    useEffect(() => {
        const handleTyping = () => {
            socket.emit('typing', { receiver: id, sender: userData?._id });
        };

        const handleStopTyping = () => {
            socket.emit('stop typing', { receiver: id, sender: userData?._id });
        };

        const typingTimeout = setTimeout(() => {
            handleStopTyping();
        }, 1000);

        if (message) {
            handleTyping();
        } else {
            handleStopTyping();
        }

        return () => clearTimeout(typingTimeout);
    }, [message, socket, id, userData?._id]);




    return (
        <div className='w-full h-full  flex flex-col gap-2 rounded-md'>
            <ChatNav user = {user} status={status}  />
            <ChatWindow conversation={conversation} userData={userData} />

            <div className="w-full h-16 dark:bg-dark-card rounded-md flex flex-none items-center px-4 py-2 gap-4 relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    className='w-8 h-8 fill-gray-400 cursor-pointer'
                    onClick={() => setShowEmojiPicker(true)}
                >
                    <path d="M10 .4A9.6 9.6 0 0 0 .4 10a9.6 9.6 0 1 0 19.2-.001C19.6 4.698 15.301.4 10 .4zm0 17.199A7.6 7.6 0 1 1 10 2.4a7.6 7.6 0 1 1 0 15.199zM7.501 9.75C8.329 9.75 9 8.967 9 8s-.672-1.75-1.5-1.75S6 7.033 6 8s.672 1.75 1.501 1.75zm4.999 0c.829 0 1.5-.783 1.5-1.75s-.672-1.75-1.5-1.75S11 7.034 11 8s.672 1.75 1.5 1.75zm1.841 1.586a.756.756 0 0 0-1.008.32c-.034.066-.869 1.593-3.332 1.593-2.451 0-3.291-1.513-3.333-1.592a.75.75 0 0 0-1.339.678c.05.099 1.248 2.414 4.672 2.414 3.425 0 4.621-2.316 4.67-2.415a.745.745 0 0 0-.33-.998z"></path>
                </svg>

                <ReactModal
                    isOpen={showEmojiPicker}
                    onRequestClose={() => setShowEmojiPicker(false)}
                    className="absolute bottom-4 left-[37.5%] bg-transparent border-none"
                    overlayClassName="fixed inset-0 bg-transparent"
                >
                    <div className="absolute bottom-[10vh]">
                        <EmojiPicker style={{ backgroundColor: '#161B22' }} theme="dark" onEmojiClick={onEmojiClick} />
                    </div>
                </ReactModal>

                <div className='flex-grow h-full border border-gray-500 rounded-3xl'>
                    <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='w-full h-full outline-none border-none bg-transparent text-gray-100 p-2 px-4 text-lg'
                        placeholder='Message...'
                        type="text"
                    />
                </div>

                <div className='flex items-center'>
                    {message ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            className='fill-gray-200 cursor-pointer'
                            viewBox="0 0 24 24"
                            id="send"
                            onClick={sendMessage}
                        >
                            <path fill="none" d="M0 0h24v24H0V0z"></path>
                            <path d="M3.4 20.4l17.45-7.48c.81-.35.81-1.49 0-1.84L3.4 3.6c-.66-.29-1.39.2-1.39.91L2 9.12c0 .5.37.93.87.99L17 12 2.87 13.88c-.5.07-.87.5-.87 1l.01 4.61c0 .71.73 1.2 1.39.91z"></path>
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            className='fill-gray-200 cursor-pointer'
                            width="30"
                            height="30"
                        >
                            <rect width="256" height="256" fill="none"></rect>
                            <rect
                                width="192"
                                height="160"
                                x="32"
                                y="48"
                                fill="none"
                                stroke="#000"
                                className='stroke-gray-200'
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="12"
                                rx="8"
                            ></rect>
                            <path
                                fill="none"
                                stroke="#000"
                                className='stroke-gray-200'
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="12"
                                d="M32,167.99982l50.343-50.343a8,8,0,0,1,11.31371,0l44.68629,44.6863a8,8,0,0,0,11.31371,0l20.68629-20.6863a8,8,0,0,1,11.31371,0L223.99982,184"
                            ></path>
                            <circle cx="156" cy="100" r="10"></circle>
                        </svg>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DynamicChat;
