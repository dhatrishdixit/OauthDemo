import axios from "axios";
import React,{ useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "./loader";

export function AdminLayout(){

    const [isAdmin,setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const [loader,setLoader] = useState(true);

    useEffect(()=>{
        axios.get(`${process.env.VITE_BACKEND_URI}/v1/admin/verifyAdmin`,{
            withCredentials:true
        }).then(res => {
            if(res?.data.status == "success"){
                setIsAdmin(true);
                setLoader(false)
            }
        })
        ;
        
    },[setIsAdmin]);

    useEffect(()=>{

            if(isAdmin)navigate("/adminDashboard")
            else navigate("/adminLogin")

    },[loader,isAdmin,navigate])

    return loader ? <div><Loader/></div> : null

    
}