import { createContext, useContext } from "react";
import { ApiError } from "../../../backend/src/utils/ApiError";

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

export const authContext = createContext<contextType | null>(null);

export const useAuth =function(){

    if(!authContext) throw new ApiError(500,"context absent")

    return useContext(authContext);
}
