import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function OAuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/stream"); 
    }
  }, [navigate]);

  return <div>Signing you in...</div>;
}
