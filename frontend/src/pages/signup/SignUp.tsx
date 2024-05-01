import { Link, useNavigate } from "react-router-dom";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const { loading, success, signup } = useSignup();

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await signup(inputs);
    };

    useEffect(() => {
        if (success) {
            navigate("/login");
        }
    });

    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto bg-gray-400 rounded-lg">
            <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
                <h1 className="text-3xl font-semibold text-center text-black uppercase">
                    Sign Up
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text text-white">
                                Full Name
                            </span>
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            className="w-full input input-bordered h-10 bg-white"
                            value={inputs.fullName}
                            onChange={handleInput}
                        />
                    </div>

                    <div>
                        <label className="label p-2 ">
                            <span className="text-base label-text text-white">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            name="username"
                            placeholder="johndoe"
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

                    <div>
                        <label className="label">
                            <span className="text-base label-text text-white">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            className="w-full input input-bordered h-10 bg-white"
                            value={inputs.confirmPassword}
                            onChange={handleInput}
                        />
                    </div>
                    <Link
                        to={"/login"}
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block text-white"
                    >
                        Already have an account?
                    </Link>

                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2 bg-success text-white border-none hover:bg-success/60"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner"></span>
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default SignUp;
