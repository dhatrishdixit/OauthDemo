import { useState, useEffect } from "react";
import axios from "axios";
import { type userType } from '@/hooks/authState';
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

export function UserInfoPage() {
  const [userInfo, setUserInfo] = useState<userType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(1);

  const handleLogout = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        setRefresh(Math.random())

  }

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/currentUser`, {
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
  }, [refresh]);

  return isLoading ? <Loader /> : (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300">
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

      <div>{userInfo?.authType == "GoogleLogin" ? <AddPasswordForOauth setRefresh={setRefresh} id={userInfo?.id as string}/> : null}</div>
    </div>
  );
}


function AddPasswordForOauth(props:{
  setRefresh:React.Dispatch<React.SetStateAction<number>>,
  id:string
}){
  
  const { setRefresh,id } = props;
  const [both,setBoth] = useState(true);
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
 

   return (
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 min-w-md w-full transition-colors duration-300 flex flex-col gap-4">
      <div className="flex gap-4">
        <Switch checked={both} onCheckedChange={()=>setBoth(prev => !prev)}/>
        <div>{both ? "Keep Both and add password for email login" : "Just keep Email login and delete login via google"}
        </div>
      </div>
      <div className="flex flex-col gap-4">
          <Input 
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e)=> setPassword(e.target.value)}

          /><Button 
          className="w-40"
                    onClick={async()=>{
            
            try {
              setLoading(true);
              console.log(password)
              await axios.post(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/addPasswordOAuth`,{
                 newPassword : password , 
                 changeMode : both ,
                 id 
            },{
              withCredentials:true
            })
            } catch (error) {
              console.log(error)
            }

            setRefresh(Math.random())
            setLoading(false);
          }}

          disabled={loading}
          > {loading ? (<><ReloadIcon/> Loading wait...</>) : "Save Password"}</Button>
      </div>
      </div>
   )
}
