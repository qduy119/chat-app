import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGroupContext } from "../context/GroupContext";

const useGetGroups = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setGroups } = useGroupContext();

    useEffect(() => {
        const getGroups = async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `${import.meta.env.VITE_SERVER_URL}/api/groups`,
                    {
                        credentials: "include",
                    }
                );
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setGroups(data);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        getGroups();
    }, [setGroups]);

    return { loading };
};

export default useGetGroups;
