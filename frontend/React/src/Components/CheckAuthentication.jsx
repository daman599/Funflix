import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { Loader } from "../Components/helper/Loader";
import axios from "axios";

const backend_url = import.meta.env.VITE_backend_url;

const InputField = ({ ref, type, placeholder }) => {
    return (
        <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className="w-full px-3 md:px-5 py-2.5 md:py-3 text-sm md:text-base rounded-lg bg-gray-800/50 text-white
             placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-900 transition-all duration-300"
        />
    );
}

export const CheckAuthentication = () => {
    const [loading, setLoading] = useState(false);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    async function signin() {
        if (usernameRef.current.value == "" || emailRef.current.value == "" || passwordRef.current.value == "") {
            alert("All the fields are required")
            return;
        }
        setLoading(true);
        const response = await axios.post(`${backend_url}/user/signin`, {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            alert("Login successful");
            navigate("/stream");
        }
        else if (response.data.message) {
            alert("Wrong credentials")
        }
        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    return <div className="min-h-screen flex items-center justify-center px-4 py-12">

        <div className="flex flex-col itmes-center justify-center gap-5 w-full bg-blue-950/20
            max-w-md p-5 md:p-8 rounded-xl border-1 border-white/10">

            <h2 className="text-lg md:text-xl font-medium text-center text-gray-300 my-2">
                Sign in to your Account
            </h2>

            <InputField ref={usernameRef}
                type={"text"}
                placeholder={"Username"}
            />
            <InputField ref={emailRef}
                type={"email"}
                placeholder={"Email"}
            />
            <InputField ref={passwordRef}
                type={"password"}
                placeholder={"Password"}
            />

            <button onClick={signin}
                className="w-full cursor-pointer bg-blue-950 hover:bg-blue-900 transition-colors duration-300
                 text-white py-1 md:py-2 rounded-lg font-semibold text-base">
                Sign in
            </button>

            <div className="flex items-center justify-center text-xs md:text-sm">
                <span className="text-white/70">New user?&nbsp;</span>
                <Link to="/new-account">
                    <span className="text-blue-800 hover:underline font-medium">Create your account</span>
                </Link>
            </div>

            <div className="flex flex-col items-center justify-center gap-1 md:gap-2">
                <span class="text-white/70 text-sm md:text-base">Sign in with</span>
                <a href={`${backend_url}/google/auth`}>
                    <img src={"/Google_logo.jpeg"}
                        alt="Google logo"
                        className="size-6 md:size-8 cursor-pointer rounded-full"
                    />
                </a>
            </div>
        </div>
    </div>
}