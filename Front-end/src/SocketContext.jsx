import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { selectUserData } from './Features/userDetails';

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const { userData } = useSelector(selectUserData); // Assuming selectUserData returns the user data directly
    const [socket, setSocket] = useState(null);

    const socketInstance = useMemo(() => {
        if (userData?._id) {
            return io('http://localhost:3000', {
                withCredentials: true,
                query: { userId: userData._id }
            });
        }
        return null; 
    }, [userData]);

    useEffect(() => {
        if (socketInstance) {
            setSocket(socketInstance);

            socketInstance.on('connect', () => {});

            return () => {
                socketInstance.off('connect'); 
                socketInstance.disconnect(); // Use disconnect for better cleanup
            };
        }
    }, [socketInstance]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
