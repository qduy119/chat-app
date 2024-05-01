import { useConversationContext } from "../../context/ConversationContext";
import { User } from "../../context/AuthContext";
import { useGroupContext } from "../../context/GroupContext";
import useLazyGetMessages from "../../hooks/useLazyGetMessages";

const Conversation = ({
    conversation,
    emoji,
    onlineUsers,
}: {
    conversation: User;
    emoji: string;
    onlineUsers: string[];
}) => {
    const { selectedConversation, setSelectedConversation } =
        useConversationContext();
    const { setSelectedGroup } = useGroupContext();
    const { getMessages } = useLazyGetMessages();
    const isSelected = selectedConversation?._id === conversation._id;
    const isOnline = onlineUsers.includes(conversation._id);

    async function handleSelect() {
        setSelectedConversation(conversation);
        setSelectedGroup(null);
        await getMessages(conversation?._id);
    }

    return (
        <>
            <div
                className={`flex gap-2 items-center hover:bg-sky-500 p-2 cursor-pointer rounded-md
				${isSelected ? "bg-sky-400" : ""}
			`}
                onClick={handleSelect}
            >
                <div className={`avatar ${isOnline ? "online" : ""}`}>
                    <div className="w-12 rounded-full">
                        <img src={conversation.avatar} alt="user avatar" />
                    </div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 justify-between">
                        <p className="font-bold text-gray-200">
                            {conversation.fullName}
                        </p>
                        <span className="text-xl">{emoji}</span>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Conversation;
