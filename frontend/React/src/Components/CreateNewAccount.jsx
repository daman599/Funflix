import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Components/helper/Loader";
import axios from "axios";
import { motion } from "motion/react";

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

export const CreateNewAccount = () => {
    const [loading, setLoading] = useState(false);

    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    async function signup() {
        if (
            usernameRef.current.value === "" ||
            emailRef.current.value === "" ||
            passwordRef.current.value === ""
        ) {
            alert("All fields are required");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(`${backend_url}/user/signup`, {
                username: usernameRef.current.value,
                email: emailRef.current.value,
                password: passwordRef.current.value,
            });

            if (response.data.message) {
                alert(response.data.message);
                navigate("/auth");
            } else if (response.data.errordetails) {
                const issues = response.data.errordetails.issues;
                issues.forEach((issue) => {
                    alert(issue.message.replace("Invalid", "Please enter a valid"));
                });
            } else {
                alert(response.data.error || "Unknown error");
            }
        } catch (e) {
            alert("Server error. Try again later.");
        }

        setLoading(false);
    }

    if (loading) {
        return <Loader />
    }

    return (
        <motion.div initial={{ opacity: 0, filter: "blur(2px)" }}
            whileInView={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex items-center justify-center px-4 py-12"
        >
            <div className="flex flex-col itmes-center justify-center w-full bg-blue-950/20
            max-w-md p-4 md:p-8 rounded-xl border-1 border-white/10">

                <div className="relative mx-auto">
                    <h2 className="text-xl md:text-2xl font-medium text-white text-center mb-8">
                        Create Your Account
                    </h2>
                    <motion.div initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                        style={{ transformOrigin: "center" }}
                        className="absolute left-1/2 -translate-x-1/2 bottom-6 w-full h-0.5 rounded-full bg-white/50"></motion.div>
                </div>

                <div className="space-y-3 md:space-y-5">
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
                </div>

                <button onClick={signup}
                    className="cursor-pointer mt-5 md:mt-8 w-full py-2 md:py-3 bg-gray-800/50 text-white text-base font-bold rounded-lg 
                    border border-white/10 hover:bg-white/50 hover:text-black transition-all duration-300"
                >
                    Sign Up
                </button>
            </div>
        </motion.div >
    )
}