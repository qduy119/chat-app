import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from "react";
import { Message } from "./ConversationContext";
import { User } from "./AuthContext";

export interface Group {
    _id: string;
    participants: User[];
    messages: string[];
    group: GroupDetail;
}

interface GroupDetail {
    _id: string;
    name: string;
    thumbnail: string;
    creator: string;
}

interface IGroupContextType {
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    messages: Message[];
    setMessages: Dispatch<SetStateAction<Message[]>>;
    selectedGroup: Group | null;
    setSelectedGroup: Dispatch<SetStateAction<Group | null>>;
    groups: Group[];
    setGroups: Dispatch<SetStateAction<Group[]>>;
}

const GroupContext = createContext<IGroupContextType>({} as IGroupContextType);

export const useGroupContext = (): IGroupContextType => {
    return useContext(GroupContext);
};

export const GroupContextProvider = ({ children }: { children: ReactNode }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);

    return (
        <GroupContext.Provider
            value={{
                loading,
                setLoading,
                messages,
                setMessages,
                selectedGroup,
                setSelectedGroup,
                groups,
                setGroups,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};
