import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "sonner";

export const useAdminState = () => {

    const [isAdminVerified,setIsAdminVerified] = useState(false);
    const [isLoading,setIsLoading] = useState(true);


    useEffect(()=>{
     
        axios.get(`${process.env.VITE_BACKEND_URI}/v1/admin/verifyAdmin`,{
            withCredentials:true
        }).then(res => {
            if(res?.data.status == "success"){
                setIsAdminVerified(true);    
            }
        }).catch(err => {
            console.log(err);
            toast("Admin not logged in");
            setIsAdminVerified(false);
        }).finally(()=>setIsLoading(false))
        ;
        
    },[]);

    return {isAdminVerified,isLoading};


} 