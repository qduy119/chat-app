import { useState } from "react";
import toast from "react-hot-toast";
import { useGroupContext } from "../context/GroupContext";

const useSendMessageInGroup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setMessages, selectedGroup } = useGroupContext();

    const sendMessage = async (payload: FormData) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/groups/send/${
                    selectedGroup?._id
                }`,
                {
                    method: "POST",
                    credentials: "include",
                    body: payload,
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setMessages((prev) => [...prev, data]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessageInGroup;
