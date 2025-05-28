import { Link, useNavigate } from "react-router-dom"
import { useState, useRef } from "react"
import axios from "axios"

export function Auth() {
  return <div>
    <CheckAuthentication />
  </div>
}

function CheckAuthentication() {
  const [loading, setLoading] = useState(false)
  const google_url = "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/05/Google-2025-G-logo.webp?strip=info&w=460&ssl=1"

  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const navigate = useNavigate();

  async function signin() {
    if (usernameRef.current.value == "" || emailRef.current.value == "" || passwordRef.current.value == "") {
      alert("All the fields are required")
      return;
    }
    setLoading(true);
    const response = await axios.post("http://localhost:3000/user/signin", {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value
    }, {
      withCredentials: true
    })

    if (response.data.okmessage) {
      alert(response.data.okmessage)
      navigate("/stream")
    }

    if (response.data.message) {
      alert("Wrong credentials")
    }
    setLoading(false);
  }

  return <>
    {loading ? <p>Loading....</p> :
      (<div style={{ height: 300, width: 300, backgroundColor: "grey", padding: 10, marginLeft: 200 }}>
        Signin to your Account

        <div><input type={"text"} placeholder={"Username"} ref={usernameRef}></input></div>
        <br />

        <div><input type={"email"} placeholder={"Email"} ref={emailRef}></input></div>

        <br />
        <div><input type={"password"} placeholder={"Password"} ref={passwordRef} ></input></div>

        <br />
        <button style={{ cursor: "pointer" }} onClick={signin}>Signin</button>

        <div>
          <p>New user ??</p>
          <Link to="/new-account"><p>Create your Account</p></Link>
        </div>

        <div>Signin with
          <a href="http://localhost:3000/google/auth"><img src={google_url} alt={"Google"} style={{ height: 20, width: 20, borderRadius: 20, cursor: "pointer" }}></img></a>
        </div>
      </div>)
    }
  </>
}