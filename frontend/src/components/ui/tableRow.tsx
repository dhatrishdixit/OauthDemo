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

export function TableRowCustom(props:RowPropType):JSX.Element{

   
     
    return (
        <TableRow className="">
          <TableRow>{props.ind}</TableRow>
          <TableCell>{props.name}</TableCell>
          <TableCell>{props.email}</TableCell>
          <TableCell>{formatDate(props.createdAt)}</TableCell>
          <TableCell>{formatDate(props.updatedAt)}</TableCell>
          <TableCell>{props.authType}</TableCell>
          <TableCell>
            <Button variant="default" disabled={props.refreshToken !== null}>Logout Session</Button>
            <Button variant="destructive">Delete Account</Button>
          </TableCell>
        </TableRow>
    )
}
