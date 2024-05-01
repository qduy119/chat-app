import { useEffect } from "react";
import { TiMessages } from "react-icons/ti";
import { useAuthContext } from "../../context/AuthContext";
import { useConversationContext } from "../../context/ConversationContext";
import { useGroupContext } from "../../context/GroupContext";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import MessagesGroup from "./MessagesGroup";
import MessageInputGroup from "./MessageInputGroup";
import MemberGroupButton from "../buttons/MemberGroupButton";
import MemberGroupModal from "../modals/MemberGroupModal";

const MessageContainer = () => {
    const { selectedConversation, setSelectedConversation } =
        useConversationContext();
    const { selectedGroup, setSelectedGroup } = useGroupContext();

    useEffect(() => {
        return () => setSelectedConversation(null);
    }, [setSelectedConversation]);
    useEffect(() => {
        return () => setSelectedGroup(null);
    }, [setSelectedGroup]);

    return (
        <div className="md:min-w-[450px] flex flex-col">
            {!selectedConversation && !selectedGroup ? (
                <NoChatSelected />
            ) : (
                <>
                    {selectedConversation ? (
                        <>
                            <div className="bg-slate-200 px-4 py-2 mb-2 rounded-tr-lg">
                                <span className="label-text text-gray-500">
                                    To:
                                </span>{" "}
                                <span className="text-gray-900 font-bold">
                                    {selectedConversation.fullName}
                                </span>
                            </div>
                            <Messages />
                            <MessageInput />
                        </>
                    ) : selectedGroup ? (
                        <>
                            <div className="bg-slate-200 px-4 py-2 mb-2 rounded-tr-lg flex justify-between items-center">
                                <div className="h-fit">
                                    <span className="label-text text-gray-500">
                                        To:
                                    </span>{" "}
                                    <span className="text-gray-900 font-bold">
                                        {selectedGroup.group.name}
                                    </span>
                                </div>
                                <MemberGroupButton />
                            </div>
                            <MessagesGroup />
                            <MessageInputGroup />
                        </>
                    ) : null}
                </>
            )}
            <MemberGroupModal />
        </div>
    );
};
export default MessageContainer;

const NoChatSelected = () => {
    const { authUser } = useAuthContext();
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="px-4 text-center sm:text-lg md:text-xl text-gray-400 font-semibold flex flex-col items-center gap-2">
                <p>Welcome 👋 {authUser?.fullName} ❄</p>
                <p>Select a chat to start messaging</p>
                <TiMessages className="text-3xl md:text-6xl text-center" />
            </div>
        </div>
    );
};
