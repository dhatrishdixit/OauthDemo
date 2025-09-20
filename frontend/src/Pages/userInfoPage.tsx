import { useState, useEffect } from "react";
import axios from "axios";
import { type userType } from '@/hooks/authState';
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function UserInfoPage() {
  const [userInfo, setUserInfo] = useState<userType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      
      await axios.put(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/logout`,null,{
        withCredentials:true
      });
      
      toast("User logged out",{
        action: {
                    label: "Ok",
                    onClick: () => {},
                },
      });
      
       navigate("/login");
    } catch (error) {
      console.log(error)
      toast("User not logged in",{
        action: {
                    label: "Ok",
                    onClick: () => {},
                },
      });

    }
  }

  useEffect(() => {
    axios(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/currentUser`, {
      withCredentials: true
    })
    .then(res => {
      setUserInfo(res.data.data);
    })
    .catch(err => {
      console.log(err);
      toast("User not logged in",{
        action: {
                    label: "Ok",
                    onClick: () => {},
                },
      });
      setUserInfo(null);
    })
    .finally(() => setIsLoading(false));
  }, []);

  return isLoading ? <Loader /> : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
      <Button className="absolute top-4 right-4" variant="outline" onClick={()=>navigate("/adminLogin")}><ArrowRight /> Login as Admin</Button>
        <Button className="absolute bottom-4 right-4" variant="destructive" onClick={handleLogout}><ArrowLeft /> Logout as User</Button>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-md w-full transition-colors duration-300">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
          User Profile
        </h2>
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
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
  );
}
