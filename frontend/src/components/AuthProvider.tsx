import { useState } from "react";
import { authContext } from '../hooks/authState';




type AuthType = "GoogleLogin" | "PasswordLogin" | "Both"

type userType = {
     id:string,
     name:string,
     email:string,
     authType: AuthType
}

type contextTypeProvider = {
    children:React.ReactNode,
    
}


export const AuthProvider = (({children}:contextTypeProvider):React.ReactNode=>{
    
    const [user,setUser] = useState<userType|null>(null);

    const login = (userInfo:userType) => {
          setUser(userInfo);
    }

    const logout = () => {
        setUser(null);
    }
     
    return (
        <authContext.Provider
            value={{
                user,login,logout
            }}
          >
            {children}
          </authContext.Provider>
       )
          
})


