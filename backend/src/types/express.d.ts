import { User } from "@prisma/client";
import { TloginRead } from "./general.ts";


declare global {
    namespace Express{
        export interface Request {
            user?:TloginRead
        }
    }
}