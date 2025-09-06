import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/hooks/authenticationState";
import { Loader } from "./loader";

type AuthLayoutProps = {
    children : React.ReactNode,
    authentication : boolean
}

export const Protected = ({children,authentication=true}:AuthLayoutProps) => {
    const authStatus = useAuth()?.user !== null ;
    const navigate = useNavigate();
    const [loader,setLoader] = useState<boolean>(true);

    useEffect(()=>{
        if(authentication && authStatus !== authentication) navigate("/login");
        else if(!authentication && authStatus !== authentication) navigate("/home")
        setLoader(false);
    },[authentication,authStatus,navigate])


//   No dependency array → effect runs after every render, cleanup runs before the next effect → mount + unmount logs every render.

// Empty dependency array → effect runs once on mount, cleanup runs only on unmount.

    return loader ? <><Loader/></> : <>{children}</>

}