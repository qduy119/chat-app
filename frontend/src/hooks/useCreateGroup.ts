import { useState } from "react";
import toast from "react-hot-toast";
import { useGroupContext } from "../context/GroupContext";

const useCreateGroup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setGroups } = useGroupContext();

    const createGroup = async (payload: FormData) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/groups`,
                {
                    method: "POST",
                    credentials: "include",
                    body: payload,
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setGroups((prev) => [...prev, data]);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { createGroup, loading };
};

export default useCreateGroup;
