import { useState } from "react";
import toast from "react-hot-toast";
import { useGroupContext } from "../context/GroupContext";

const useAddMember = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { selectedGroup } = useGroupContext();

    const addMember = async (payload: string[]) => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/groups/add-member/${
                    selectedGroup?._id
                }`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ participants: payload }),
                }
            );
            const data = await res.json();
            if (data.error) throw new Error(data.error);
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { addMember, loading };
};

export default useAddMember;
