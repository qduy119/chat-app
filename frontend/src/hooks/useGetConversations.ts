import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { User } from "../context/AuthContext";

const useGetConversations = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [conversations, setConversations] = useState<User[]>([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/api/users`,
                    {
                        credentials: "include",
                    }
                );
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;
