import { useNavigate } from "react-router-dom";
import { useEffect }  from "react";

export function OAuthCallback() {
  const navigate = useNavigate();
  
  useEffect(()=>{
     const params = new URLSearchParams(window.location.search);
     const token = params.get("token");
     if (token) {
      localStorage.setItem("token", token);
      navigate("/stream"); 
    }
  },[navigate]) 
}
