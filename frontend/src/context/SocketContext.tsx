import {
    createContext,
    useState,
    useEffect,
    useContext,
    useRef,
    ReactNode,
} from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";

interface ISocketContextType {
    socket: Socket | null;
    onlineUsers: string[];
}

const SocketContext = createContext<ISocketContextType>({} as ISocketContextType);

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const socketRef = useRef<Socket | null>(null);
    const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
    const { authUser } = useAuthContext();

    useEffect(() => {
        if (authUser) {
            const socket = io(import.meta.env.VITE_SERVER_URL, {
                query: {
                    userId: authUser._id,
                },
            });
            socketRef.current = socket;
            setSocket(socket);

            return () => {
                socket.close();
            };
        } else {
            if (socketRef.current) {
                socketRef.current.close();
                socketRef.current = null;
                setSocket(null);
            }
        }
    }, [authUser]);
    useEffect(() => {
        function handleOnlineUsers(users: string[]) {
            setOnlineUsers(users);
        }
        if (socket) {
            socket.on("getOnlineUsers", handleOnlineUsers);

            return () => {
                socket.off("getOnlineUsers", handleOnlineUsers);
            };
        }
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
