import { useState, useRef } from "react"
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

    async function signup() {

        setLoading(true);
        const response = await axios.post("http://localhost:3000/user/signup", {
            username: usernameRef.current,
            email: emailRef.current,
            password: passwordRef.current
        })
        if (response.data.ERROR) {
            //zod error
            alert(response.data.ERROR)
        }
        setLoading(false);
    }

    return <>
        {!loading && message != "" && <p>{message}</p>}
        {loading ? <p>Loading....</p> :
            (<div style={{ height: 300, width: 300, backgroundColor: "grey", padding: 10, marginLeft: 200 }}>
                Create new Account

                <div><input
                    type={"text"}
                    placeholder={"Username"}
                    onChange={(e) => { usernameRef.current = e.target.value.trim() }}
                ></input></div>
                <br />

                <div><input
                    type={"email"}
                    placeholder={"Email"}
                    onChange={(e) => { emailRef.current = e.target.value.trim() }}
                ></input></div>

                <br />
                <div><input type={"password"}
                    placeholder={"Password"}
                    onChange={(e) => { passwordRef.current = e.target.value.trim() }}
                ></input></div>

                <br />
                <button style={{ cursor: "pointer" }} onClick={signup}>Signup</button>

            </div>)
        }
    </>
}