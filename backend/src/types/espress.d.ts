import { User } from "@prisma/client";
import { TloginRead } from "./general.js";


declare global {
    namespace Express{
        export interface Request {
            user?:TloginRead
        }
    }
}