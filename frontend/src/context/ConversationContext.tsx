import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { User } from "./AuthContext";

export interface Message {
    _id: string;
    senderId: User;
    receiverId: string;
    message: string;
    images: string[];
    shouldShake: boolean;
    createdAt: string;
}

interface IConversationContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    selectedConversation: User | null;
    setSelectedConversation: Dispatch<SetStateAction<User | null>>;
}

const ConversationContext = createContext<IConversationContextType>(
    {} as IConversationContextType
);

export const useConversationContext = (): IConversationContextType => {
    return useContext(ConversationContext);
};

export const ConversationContextProvider = ({
    children,
}: {
    children: ReactNode;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedConversation, setSelectedConversation] =
        useState<User | null>(null);

    return (
        <ConversationContext.Provider
            value={{
                loading,
                setLoading,
                messages,
                setMessages,
                selectedConversation,
                setSelectedConversation,
            }}
        >
            {children}
        </ConversationContext.Provider>
    );
};
