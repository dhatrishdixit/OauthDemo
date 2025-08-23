import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const getUserById = async (id:string) => {
       return await db.user.findUnique({
           where : {
               id 
           },
           select : {
               id : true ,
               name : true,
               email : true,
           }
       }) 

}



export {
    getUserById
}