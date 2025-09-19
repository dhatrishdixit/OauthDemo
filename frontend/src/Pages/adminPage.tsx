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


export type RowPropType = userType & { ind:number, setRefresh:React.Dispatch<React.SetStateAction<number>> }


export function AdminPage() {

  const navigate = useNavigate();
  const [refresh,setRefresh] = useState(1);
  const [users,setUsers] = useState<[userType]>();

  const {isAdminVerified,isLoading} = useAdminState();

  useEffect(()=>{
    console.log("isAdminVerified",isAdminVerified)
    if(isLoading == false && !isAdminVerified) navigate("/adminLogin");
  },[isAdminVerified,isLoading,navigate]);

  useEffect(()=>{
     axios
     .get(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/userInfo`,{
      withCredentials:true
     })
     .then(res => setUsers(res.data.users))
  },[refresh])

  return (
    <div className="dark:bg-gray-900 h-screen w-screen overflow-y-scroll flex justify-center items-center">
     <Table className="w-[80vw] border border-gray-200 dark:border-gray-700 border-collapse rounded-lg shadow-md">
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
    {users?.map((data, ind) => (
      <TableRowCustom
        key={data.id}
        ind={ind + 1}
        {...data}
        setRefresh={setRefresh}
      />
    ))}
  </TableBody>
</Table>

    </div>
  )
}


