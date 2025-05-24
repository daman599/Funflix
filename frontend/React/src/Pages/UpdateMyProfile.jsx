 import { useRef } from "react"
 import { useNavigate } from "react-router-dom"
 import axios from "axios"
 export function UpdateMyProfile(){
   return <div>
     <UpdateProfile />
   </div>
 }

function UpdateProfile() {
   const navigate=useNavigate();

    const newusernameRef=useRef(null);
    const newemailRef=useRef(null);
    const newpasswordRef=useRef(null);
    
    async function Update(){
          const response = await axios.put("http://localhost:3000/user/profile",{
             newUsername: newusernameRef.current?.value,
             newPassword: newpasswordRef.current?.value,
             newEmail: newemailRef.current?.value
          },{
            withCredentials:true
          })
          
          if(response.data.message){
            alert(response.data.message);
            navigate("/me")
          }
    }
    return <>
            <div style={{ height: 300, width: 300, backgroundColor: "grey", padding: 10, marginLeft: 200 }}>

                Update your Profile

                <div><input type={"text"} placeholder={"New Username"} ref={newusernameRef}></input><button onClick={Update}>Update username</button></div>
                <br />

                <div><input type={"email"} placeholder={"New Email"} ref={newemailRef}></input><button onClick={Update}>Update email</button></div>
                <br />

                <div><input type={"password"} placeholder={"New Password"} ref={newpasswordRef}></input><button onClick={Update}>Update password</button></div>
            </div>
    </>
}