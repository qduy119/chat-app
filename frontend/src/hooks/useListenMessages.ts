import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
import {
    Message,
    useConversationContext,
} from "../context/ConversationContext";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversationContext();

    useEffect(() => {
        function handleNewMessages(newMessage: Message) {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages((prev) => [...prev, newMessage]);
        }
        socket?.on("newMessage", handleNewMessages);

        return () => {
            socket?.off("newMessage", handleNewMessages);
        };
    }, [socket, setMessages]);
};

export default useListenMessages;
