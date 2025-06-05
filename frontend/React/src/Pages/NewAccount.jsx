import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export function NewAccount() {
    return <div>
        <CreateNewAccount />
    </div>
}

function CreateNewAccount() {
    const [loading, setLoading] = useState(false)

    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const navigate = useNavigate();

    async function signup() {

        if (usernameRef.current.value == "" || emailRef.current.value == "" || passwordRef.current.value == "") {
            alert("All the fields are required")
            return;
        }
        setLoading(true);

        const response = await axios.post("http://localhost:3000/user/signup", {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        })
        if (response.data.message) {
            alert(response.data.message);
            navigate("/auth");
        }
        else {
            if (response.data.errordetails) {
                const issuesArray = response.data.errordetails.issues;

                for (let i = 0; i < issuesArray.length; i++) {

                    if (issuesArray[i].message == "Invalid string") {
                        alert("Invalid username");
                    }
                    else if (issuesArray[i].message == "Invalid email") {
                        alert("Invalid email");
                    }
                    else if (issuesArray[i].message == "Password must contain one lowercase character") {
                        alert("Password must contain one lowercase character")
                    }
                    else if (issuesArray[i].message == "Password must contain one uppercase character") {
                        alert("Password must contain one uppercase character")
                    }
                    else if (issuesArray[i].message == "Password must contain one special character") {
                        alert("Password must contain one special character")
                    }
                }
            }
            else {
                alert(response.data.error)
            }
        }
        setLoading(false)
    }

    return <>
        {loading ? 
        <div class="h-screen flex justify-center items-center py-9">
           <div class="w-12 h-12 border-4 border-t-transparent rounded-full animate-spin border-[#373D90]"></div>
        </div>:
            (<div class="w-[90%] sm:w-[400px] bg-[#B0B1C4] p-6 mx-auto mt-10 rounded-lg shadow-md">
                <h2 class="text-2xl font-semibold text-center mb-6 text-[#373D90]">Create new Account</h2>

                <div class="mb-4"><input 
                type={"text"} 
                placeholder={"Username"} 
                ref={usernameRef} 
                class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#373D90]"></input></div>

                <div class="mb-4"><input 
                type={"email"} 
                placeholder={"Email"} 
                ref={emailRef} 
                class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#373D90]"></input></div>

                <div class="mb-6"><input 
                type={"password"} 
                placeholder={"Password"} 
                ref={passwordRef} 
                class="w-full px-4 py-2 rounded border border-gray-400 focus:outline-none focus:ring-2 focus:ring-[#373D90]"></input></div>

                <button class="w-full bg-[#373D90] text-white py-2 rounded hover:bg-[#2f3475] transition duration-200" onClick={signup}>Signup</button>
            </div>)
        }
    </>
}