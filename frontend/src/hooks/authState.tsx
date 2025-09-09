import { createContext, useContext } from "react";
import { ApiError } from "../../../backend/src/utils/ApiError";

type AuthType = "GoogleLogin" | "PasswordLogin" | "Both"

export type userType = {
     id:string,
     name:string,
     email:string,
     authType: AuthType
}


type contextType = {
    user:userType | null ,
    login:(userInfo:userType)=>void,
    logout:()=>void
}

export const authContext = createContext<contextType>({
    user:null,
    login:()=>{},
    logout:()=>{}
});

export const useAuth =function(){

    if(!authContext) throw new ApiError(500,"context absent")

    return useContext(authContext);
}
