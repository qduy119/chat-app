import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import notificationSound from "../assets/sounds/notification.mp3";
import { Message } from "../context/ConversationContext";
import { useGroupContext } from "../context/GroupContext";

const useListenGroupMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useGroupContext();

    useEffect(() => {
        function handleNewMessages(newMessage: Message) {
            newMessage.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            setMessages((prev) => [...prev, newMessage]);
        }
        socket?.on("newGroupMessage", handleNewMessages);

        return () => {
            socket?.off("newGroupMessage", handleNewMessages);
        };
    }, [socket, setMessages]);
};

export default useListenGroupMessages;
