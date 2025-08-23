import { PrismaClient } from "@prisma/client";
import express from "express";
import dotenv from "dotenv";
import { userSchema } from "./types/zod.js";

const prisma = new PrismaClient();

dotenv.config({
    path:"../env"
})



// routes required 
// create user 

const app = express();

async function test(){
    try {
        const res = await prisma.user.create({
        data:{
            name:"test5",
            email:"test5"
        }
    })

    console.log("test successfull : ",res)
    } catch (error) {
        console.log(error)
    }
}


test();

