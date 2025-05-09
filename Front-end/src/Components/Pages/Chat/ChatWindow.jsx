import { useEffect, useRef } from "react";

const ChatWindow = ({conversation,userData}) => {
    const chatEndRef = useRef(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [conversation]);
    
    let lastSenderId = null;
    return (
        <div className="w-full  max-h-[70vh]  overflow-y-auto flex flex-col flex-grow no-scrollbar md:px-1">
            {conversation?.map((msg) => {
                const isCurrentUser = msg?.sender._id === userData._id;
                const isNewSender = msg?.sender._id !== lastSenderId;

                lastSenderId = msg?.sender._id;

                const messageClasses = `max-w-[50vh] min-w-[8vh] w-fit rounded-md px-2 py-1.5 my-[7px] relative  ${isCurrentUser ? "bg-blue-600 text-gray-200 ml-auto" : "bg-dark-card text-gray-200"
                    }`;

                return (
                    <div key={msg._id} className={`flex items-center -mb-2 ${isCurrentUser ? "justify-end" : ""}`}>
                        {!isCurrentUser && isNewSender && (
                            <img
                                src={msg.sender.avatar}
                                alt="Avatar"
                                className="w-8 h-8 rounded-full mr-2"
                            />
                        )}
                        <div className={`group ${isCurrentUser && "flex-row-reverse"} flex items-center gap-2`}>

                            <div className={`${messageClasses} ${(!isCurrentUser && !isNewSender) && "ml-10"}`}>
                                <h1>{msg?.content}</h1>
                            </div>
                            <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>
                );
            })}
            <div ref={chatEndRef} />
        </div>
    )
}
export default ChatWindow