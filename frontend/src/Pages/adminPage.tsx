import { 
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,

} from "@/components/ui/table"
import { TableRowCustom } from "@/components/ui/tableRow";
import { useAdminState } from "@/hooks/adminState";
import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

type userType = {
      id:string,
     email:string,
     name:string,
     createdAt:string,
     updatedAt:string,
     authType:"GoogleLogin" | "PasswordLogin" | "Both",
     refreshToken:string,
}


export type RowPropType = Omit<userType,'id'> & { key:string, setRefresh:React.Dispatch<React.SetStateAction<boolean>> }


export function AdminPage() {

  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(false);
  const [users,setUsers] = useState<[userType]>();

  const {isAdminVerified,isLoading} = useAdminState();

  useEffect(()=>{
    if(isLoading == false && isAdminVerified) navigate("/adminDashboard");
  },[isAdminVerified,isLoading,navigate]);

  useEffect(()=>{
     axios
     .get(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/userInfo`,{
      withCredentials:true
     })
     .then(res => setUsers(res.data.users))
  },[refresh])

  return (
    <div>
       <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">S. No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Authentication Type</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
           {
              users?.map(data=>(
                <TableRowCustom
                    key={data.id}
                    email={data.email}
                    name = {data.name}
                    createdAt={data.createdAt}
                    updatedAt={data.updatedAt}
                    refreshToken={data.refreshToken}
                    authType={data.authType}
                    setRefresh={setRefresh}
                />
              ))
           }
        </TableBody>
        
        </Table> 
    </div>
  )
}


