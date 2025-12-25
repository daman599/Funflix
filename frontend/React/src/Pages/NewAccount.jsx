import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/helper/Loader";
import { motion } from "motion/react";
import axios from "axios";

const backend_url = import.meta.env.VITE_backend_url;

const containerVariants = {
  hidden: { opacity: 0, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

const itemsVariants = {
  hidden: { opacity: 0, filter: "blur(3px)", y: 30 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }

  },
}

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

export const NewAccount = () => {
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <motion.div variants={containerVariants}
        initial={"hidden"}
        whileInView={"visible"}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="flex flex-col itmes-center justify-center w-full bg-blue-950/20
            max-w-md p-4 md:p-8 rounded-xl border-1 border-white/10 gap-5">

        <motion.h2 initial={{ opacity: 0, scale: 0.95, filter: "blur(3px)" }}
          whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-xl md:text-2xl font-medium text-white text-center">
          Create Your Account
        </motion.h2>

        <motion.div variants={itemsVariants}>
          <InputField ref={usernameRef}
            type={"text"}
            placeholder={"Username"}
          />
        </motion.div>

        <motion.div variants={itemsVariants}>
          <InputField ref={emailRef}
            type={"email"}
            placeholder={"Email"}
          />
        </motion.div>

        <motion.div variants={itemsVariants}>
          <InputField ref={passwordRef}
            type={"password"}
            placeholder={"Password"}
          />
        </motion.div>

        <button onClick={signup}
          className="cursor-pointer w-full py-2 bg-gray-800/50 text-white text-base font-bold rounded-lg 
                    border border-white/10 hover:bg-blue-950 transition-all duration-300"
        >
          Sign Up
        </button>
      </motion.div>
    </div >
  )
}
