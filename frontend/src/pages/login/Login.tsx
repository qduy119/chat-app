import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../context/AuthContext";

const Login = () => {
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [inputs, setInput] = useState({
        username: "",
        password: "",
    });

    const { loading, login } = useLogin();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await login(inputs.username, inputs.password);
    };

    useEffect(() => {
        if (authUser) {
            navigate("/");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto rounded-lg bg-gray-400">
            <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-black uppercase">
                    Login
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="Enter username"
                            className="w-full input input-bordered h-10 bg-white"
                            value={inputs.username}
                            onChange={handleInput}
                        />
                    </div>

                    <div>
                        <label className="label">
                            <span className="text-base label-text text-white">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            className="w-full input input-bordered h-10 bg-white"
                            value={inputs.password}
                            onChange={handleInput}
                        />
                    </div>
                    <Link
                        to="/signup"
                        className="text-sm  hover:underline hover:text-blue-600 mt-2 inline-block text-white"
                    >
                        {"Don't"} have an account?
                    </Link>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 bg-success text-white border-none hover:bg-success/60"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner "></span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;
