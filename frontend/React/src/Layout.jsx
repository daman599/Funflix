import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";

const Backend_url = "https://funflix-backend-j5wb.onrender.com";

export const Layout = () => {
    const location = useLocation();
    const isStreamPage = location.pathname === "/stream";
    const [userLoggedin, setUserLoggedin] = useState(false);

    useEffect(() => {
        async function checkUserAuth() {
            const token = localStorage.getItem('token');

            const isuserLoggedin = await axios.get(`${Backend_url}/user/check-auth`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (isuserLoggedin.data.status) {
                setUserLoggedin(true);
            }
        }
        checkUserAuth();
    }, [])

    return <>
        <Navbar userLoggedin={userLoggedin} isStreamPage={isStreamPage} />
        <Outlet />
    </>
}