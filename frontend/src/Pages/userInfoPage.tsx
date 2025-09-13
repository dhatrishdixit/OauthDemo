import { useState,useEffect } from "react"
import axios from "axios"
import { type userType } from '@/hooks/authState';
import { toast } from "sonner";
import { Loader } from "@/components/loader";

export function UserInfoPage() {

  const [userInfo,setUserInfo] = useState<userType|null>(null);
  const [isLoading,setIsLoading] = useState(true);

  useEffect(()=>{
      axios(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/currentUser`)
      .then(res => {
        setUserInfo(res.data.data);
      })
      .catch(err => {
         console.log(err);
         toast("User not logged in");
         setUserInfo(null);
      })
      .finally(() => setIsLoading(false))
  },[])

  return isLoading ? <Loader/> : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
            User Profile
          </h2>
          <div className="space-y-3">
            <div>
              <span className="font-semibold">ID:</span> {userInfo?.id}
            </div>
            <div>
              <span className="font-semibold">Name:</span> {userInfo?.name}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {userInfo?.email}
            </div>
            <div>
              <span className="font-semibold">Auth Type:</span> {userInfo?.authType}
            </div>
          </div>
        </div>
    </div>
  )
}


