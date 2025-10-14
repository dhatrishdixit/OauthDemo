import type { NextFunction, Request , Response } from "express";


export function healthCheck (req:Request,res:Response){
    res
    .status(200)
    .json(
        {
         health:"ok",
         success:"true"
        },
    )
        
   
}