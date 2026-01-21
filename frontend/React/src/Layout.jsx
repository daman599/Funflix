import axios from "axios";
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Components/Navbar";

const backend_url = import.meta.env.VITE_backend_url;

export const Layout = () => {
    const [userLoggedin, setUserLoggedin] = useState(false);

    useEffect(() => {
        async function checkUserAuth() {
            const token = localStorage.getItem('token');

            const isuserLoggedin = await axios.get(`${backend_url}/user/check-auth`, {
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
        <Navbar userLoggedin={userLoggedin} />
        <Outlet userLoggedin={userLoggedin} />
    </>
}
