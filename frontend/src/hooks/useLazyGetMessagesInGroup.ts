import toast from "react-hot-toast";
import { useGroupContext } from "../context/GroupContext";

const useLazyGetMessagesInGroup = () => {
    const { setLoading, setMessages } = useGroupContext();

    const getMessages = async (id: string) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/groups/${id}`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages(data);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { getMessages };
};

export default useLazyGetMessagesInGroup;
