import { createContext, useContext } from "react";

type AuthType = "GoogleLogin" | "PasswordLogin" | "Both"

type userType = {
     id:string,
     name:string,
     authType: AuthType
}

type contextType = {
    user:userType | null ,
    login:(userInfo:userType)=>void,
    logout:()=>void
}

type contextTypeProvider = {
    children:React.ReactNode,
    user:userType | null ,
    login:(userInfo:userType)=>void,
    logout:()=>void,
}

export const authContext = createContext<contextType | null>(null);

export const authContextProvider = (({children,user,login,logout}:contextTypeProvider):React.ReactNode=>{
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

export const useAuth =function(){
    return useContext(authContext);
}

