import { useEffect, useRef } from "react";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "../../hooks/useListenMessages";
import { useConversationContext } from "../../context/ConversationContext";
import Message from "./Message";

const Messages = () => {
    const { messages, loading } = useConversationContext();
    useListenMessages();
    const lastMessageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }, [messages]);

    return (
        <div className="px-4 flex-1 overflow-auto">
            {!loading && messages.length > 0 &&
                messages.map((message, index) => (
                    <div
                        key={message._id}
                        ref={
                            index === messages.length - 1
                                ? lastMessageRef
                                : null
                        }
                    >
                        <Message message={message} />
                    </div>
                ))}

            {loading &&
                [...Array(3)].map((_, index) => (
                    <MessageSkeleton key={index} />
                ))}
            {!loading && messages.length === 0 && (
                <p className="text-center">
                    Send a message to start the conversation
                </p>
            )}
        </div>
    );
};
export default Messages;
