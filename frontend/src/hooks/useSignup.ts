import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const signup = async ({
        fullName,
        username,
        password,
        confirmPassword,
    }: {
        fullName: string;
        username: string;
        password: string;
        confirmPassword: string;
    }) => {
        const isSuccess = handleInputErrors({
            fullName,
            username,
            password,
            confirmPassword,
        });
        if (!isSuccess) return;

        setLoading(true);
        try {
            const res = await fetch(
                `${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fullName, username, password }),
                }
            );

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }
            setSuccess(true);
            toast.success("Sign up successfully");
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return { loading, success, signup };
};

export default useSignup;

function handleInputErrors({
    fullName,
    username,
    password,
    confirmPassword,
}: {
    fullName: string;
    username: string;
    password: string;
    confirmPassword: string;
}) {
    if (!fullName || !username || !password || !confirmPassword) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}
