import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export function NewAccount() {
    return <div>
        <CreateNewAccount />
    </div>
}

function CreateNewAccount() {

    const usernameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const navigate = useNavigate();

    async function signup() {

        if (usernameRef.current.value == "" || emailRef.current.value == "" || passwordRef.current.value == "") {
            alert("All the fields are required")
            return;
        }
        setLoading(true);
        try {
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
        } catch (err) {
            setMessage("Sorry! server is down please check your internet connection ");
        }
    }

    return <>
        {message != "" ? <div>{message}</div> :
             loading ? <p>Loading....</p> :
                (<div style={{ height: 300, width: 300, backgroundColor: "grey", padding: 10, marginLeft: 200 }}>
                    Create new Account

                    <div><input type={"text"} placeholder={"Username"} ref={usernameRef}></input></div>
                    <br />

                    <div><input type={"email"} placeholder={"Email"} ref={emailRef}></input></div>

                    <br />
                    <div><input type={"password"} placeholder={"Password"} ref={passwordRef}></input></div>

                    <br />
                    <button style={{ cursor: "pointer" }} onClick={signup}>Signup</button>
                </div>)
        }
    </>
}