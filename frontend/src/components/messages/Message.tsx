import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { formatMessage } from "../../utils/formatMessage";
import { MessageImage } from "../images/MessageImage";
import {
    Message as IMessage,
    useConversationContext,
} from "../../context/ConversationContext";

const Message = ({ message }: { message: IMessage }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversationContext();
    const fromMe = message.senderId?._id === authUser?._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const chatMessage = fromMe ? "text-end" : "text-start";
    const avatar = fromMe ? authUser?.avatar : selectedConversation?.avatar;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";

    const shakeClass = message.shouldShake ? "shake" : "";

    return (
        <div className={`chat ${chatClassName}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS chat bubble component"
                        src={avatar}
                    />
                </div>
            </div>
            <div
                className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
            >
                <p
                    dangerouslySetInnerHTML={{
                        __html: formatMessage(message.message),
                    }}
                    className={chatMessage}
                ></p>
                <div className="overflow-y-auto flex gap-3 rounded-lg">
                    {message?.images?.length > 0
                        ? message.images.map((image, index) => (
                              <MessageImage key={index} image={image} />
                          ))
                        : null}
                </div>
            </div>
            <div className="chat-footer opacity-50 text-xs flex gap-1 items-center mt-1">
                {formattedTime}
            </div>
        </div>
    );
};
export default Message;
