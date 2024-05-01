import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogout = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,
                {
                    credentials: "include",
                }
            );
            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("chat-user");
            setAuthUser(null);
        } catch (error) {
            if(error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
