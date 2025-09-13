import type { User } from "@prisma/client";

enum authType {
    GoogleLogin = "GoogleLogin",
    PasswordLogin = "PasswordLogin",
    Both = "Both"
}

// Omit<User,'createdAt'|'updatedAt'|'passwordHash'|'googleId'|'refreshToken'>
export type TloginRead = Pick<User,"id"|"name"|"email"|"authType">

export type userInfoType = {
        family_name: string, 
        name: string, 
        picture:string, 
        email: string, 
        given_name: string, 
        id: string, 
        verified_email: boolean,
        authType : authType
      }