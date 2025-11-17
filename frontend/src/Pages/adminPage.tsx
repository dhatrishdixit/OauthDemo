import { Loader } from "@/components/loader";
import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { TableRowCustom } from "@/components/ui/tableRow";
import { useAdminState } from "@/hooks/adminState";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { RefreshCcw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/authState";

type userType = {
      id:string,
     email:string,
     name:string,
     createdAt:string,
     updatedAt:string,
     authType:"GoogleLogin" | "PasswordLogin" | "Both",
     refreshToken:string,
}


export type RowPropType = userType & { ind:number, setRefresh:React.Dispatch<React.SetStateAction<number>> }


export function AdminPage() {

  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(1);
  const [users,setUsers] = useState<userType[]>();
  const [loading,setLoading] = useState(true);
  const {user} = useAuth();
  const {id:userId} = user as userType;

  const {isAdminVerified,isLoading} = useAdminState();

  useEffect(()=>{
    console.log("isAdminVerified",isAdminVerified)
    if(isLoading == false && !isAdminVerified) navigate("/adminLogin");
  },[isAdminVerified,isLoading,navigate]);

  useEffect(()=>{
     console.log("refresh")
     setLoading(true)
     axios
     .get(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/userInfo`,{
      withCredentials:true
     })
     .then(res => setUsers(res.data.users))
     .finally(()=>setLoading(false))
  },[refresh,users]);

  const handleAdminLogout = async () => {
    
       try {
        
          await axios.post(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/adminLogout`,null,{
            withCredentials:true
          });

          setLoading(true);

          toast("Admin Successfully Logged out",{
              action: {
          label: "Ok",
          onClick: () => {},
        },
          });

          setLoading(false);

          navigate("/adminLogin")

       } catch (error) {
           if (error instanceof AxiosError) {
                         toast("Error during login", {
                           description: error?.response?.data.message,
                           action: {
                             label: "Ok",
                             onClick: () => {},
                           },
                         });
              
                      
       }setLoading(false);
      }

  }


  return (
    <div className="dark:bg-gray-900 h-screen w-screen flex-col overflow-y-scroll overflow-x-hidden flex items-center gap-4">
      <h1 className="text-3xl p-3">Admin Dashboard</h1>
      {loading ? <Loader/> : (
         <>
          <div className="flex w-full px-[10%] justify-between">
          <div className="flex gap-2">
             <div className="flex justify-center items-center">Refresh Table : </div>
             <Button variant="outline" onClick={()=>{setRefresh(Math.random())}}><RefreshCcw/></Button>
          </div>
          <Button variant="outline" onClick={handleAdminLogout}>Logout As Admin</Button>
        </div>
        
     <Table className="w-full px-[10%] border border-gray-200 dark:border-gray-700 border-collapse rounded-lg shadow-md">
  <TableHeader>
    <TableRow className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
      <TableHead className="w-[80px] px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        S. No.
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Name
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Email
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Created At
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Updated At
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Authentication Type
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide border-r border-gray-300 dark:border-gray-700">
        Login Status
      </TableHead>
      <TableHead className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide">
        Actions
      </TableHead>
    </TableRow>
  </TableHeader>

  <TableBody>
    {users?.filter(user => user.id !==  userId).map((data, ind) => (
      <TableRowCustom
        key={data.id}
        ind={ind + 1}
        {...data}
        setRefresh={setRefresh}
      />
    
    
    ))}
  </TableBody>
</Table>
         </>
      )}


    </div>
  )
}


