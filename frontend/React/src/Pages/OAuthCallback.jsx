import { useNavigate } from "react-router-dom";

export function OAuthCallback() {
  const navigate = useNavigate();

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      navigate("/stream"); 
    }
}
