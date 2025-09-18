import type { JSX } from "react"
import { TableCell, TableRow } from "./table"
import { type RowPropType } from "@/Pages/adminPage" 
import { Button } from "./button";


function formatDate(dateString:string):string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function getAuthBadge(authType: string) {
  switch (authType) {
    case "GoogleLogin":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
          Google Login
        </span>
      );
    case "PasswordLogin":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
          Password Login
        </span>
      );
    case "Both":
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
          Google + Password
        </span>
      );
    default:
      return (
        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
          Unknown
        </span>
      );
  }
}
export function TableRowCustom(props:RowPropType):JSX.Element{

   
     
    return (
         <TableRow className="text-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors border-b border-gray-200 dark:border-gray-700">
      <TableCell className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200">
        {props.ind}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
        {props.name}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-700 dark:text-gray-300">
        {props.email}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {formatDate(props.createdAt)}
      </TableCell>
      <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
        {formatDate(props.updatedAt)}
      </TableCell>
      <TableCell className="px-4 py-3">
        {getAuthBadge(props.authType)}
      </TableCell>
      <TableCell className="px-4 py-3">
        {props.refreshToken ? (
          <span className="text-green-600 dark:text-green-400 font-medium">
            Logged In
          </span>
        ) : (
          <span className="text-red-600 dark:text-red-400 font-medium">
            Not Logged In
          </span>
        )}
      </TableCell>
      <TableCell className="px-4 py-3 flex gap-2">
        <Button
          variant="default"
          disabled={props.refreshToken == null}
          className="text-xs px-3 py-1"
          onClick={()=>{console.log("logout")}}
        >
          Logout
        </Button>
        <Button
          variant="destructive"
          className="text-xs px-3 py-1"
          onClick={()=>{console.log("delete")}}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
    )
}
