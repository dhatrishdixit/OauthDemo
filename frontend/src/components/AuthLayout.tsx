import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth, type userType } from "@/hooks/authState";
import { Loader } from "./loader";
import axios from "axios";

type AuthLayoutProps = {
    children : React.ReactNode,
    authentication : boolean
}

export const AuthLayout = ({children,authentication}:AuthLayoutProps) => {
    const {user,login} = useAuth();
    const navigate = useNavigate();
    const [loader,setLoader] = useState<boolean>(true);
    


    useEffect(()=>{
        
        const AuthHandler = async() => {
          try {
            const res = await axios
            .get(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/currentUser`,{
                withCredentials:true
            })
            
            console.log(res.data.data)

            login(res.data.data as userType);
            return true ;

          } catch (error: unknown) {
            if (axios.isAxiosError(error) && error.response) {
              console.log("Authentication error in authLayout", error.response.data.message);
            } else {
              console.log("Unknown error in authLayout", error);
            }
            try {
                // use refresh token to generate a new access token , and after that try again 

                await axios
                .post(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/refreshAccessToken`,null,{
                withCredentials:true
                 });

                const retryRes = await axios
                                 .get(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/currentUser`,{
                                    withCredentials:true
                                 });
                

                login(retryRes.data.data as userType);
                return true;


            } catch (error:unknown) {
            if (axios.isAxiosError(error) && error.response) {
              console.log("Authentication error in authLayout", error.response.data.message);
            } else {
              console.log("Unknown error in authLayout", error);
            }
             return false ;
            }

          }
    }


         async function checkAuth(){            
               setLoader(true);
               console.log("user : ",user);
               let authStatus = user !== null ;
               if(!authStatus){
                  const res = await AuthHandler();
                  authStatus = res;
               }
            if(authentication && authStatus !== authentication) navigate("/login");
            else if(!authentication && authStatus !== authentication) navigate("/")
            setLoader(false);
         }

         checkAuth();
    },[authentication,navigate,user,login])



 
//   No dependency array → effect runs after every render, cleanup runs before the next effect → mount + unmount logs every render.

// Empty dependency array → effect runs once on mount, cleanup runs only on unmount.

    return loader ? <><Loader/></> : <>{children}</>

}