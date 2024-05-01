import { useSocketContext } from "../../context/SocketContext";
import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from "../../utils/emojis";
import Conversation from "./Conversation";

const Conversations = () => {
    const { loading, conversations } = useGetConversations();
    const { onlineUsers } = useSocketContext();
    
    return (
        <div className="py-2 flex flex-col overflow-auto h-full">
            <p className="uppercase text-gray-200 py-2">Private messages</p>
            {conversations.map((conversation, idx) => (
                <Conversation
                    key={idx}
                    conversation={conversation}
                    onlineUsers={onlineUsers}
                    emoji={getRandomEmoji()}
                />
            ))}

            {loading ? (
                <span className="loading loading-spinner mx-auto"></span>
            ) : null}
        </div>
    );
};
export default Conversations;
