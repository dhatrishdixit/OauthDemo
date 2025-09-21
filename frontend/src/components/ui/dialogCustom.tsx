import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"

type CustomDialogPropType = {
     name : string ,
     id : string ,
     setIsloading : React.Dispatch<React.SetStateAction<boolean>>
}

export function CustomDialog(props:CustomDialogPropType) {

      const [isOpen,setIsOpen] = useState(false);
      const [loading,setLoading] = useState(false);

      const {name,id,setIsloading} = props ;

      const handleDelete = async () => {
        setIsOpen(true);
        setIsloading(true);
        setLoading(true);

        try {
          
          await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/logoutUser/${id}`,{
            withCredentials:true
          });

          toast(`user is deleted`,{
          action:{
            label:"Ok",
            onClick : ()=>{}
          }
         })

        } catch (error) {
          if (error instanceof AxiosError) {
        toast("Error during logging out user", {
          description: error?.response?.data.message,
          action: {
            label: "Ok",
            onClick: () => {},
          },
        });
      }

        }

        setIsloading(false);
        setIsOpen(false);
        setLoading(false)

    }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form onSubmit={handleDelete}> 
        <DialogTrigger asChild>
           <Button
          variant="destructive"
          className="text-xs px-3 py-1">
          Delete
        </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete User</DialogTitle>
            <DialogDescription>
               Are you sure you want to delete {name}
            </DialogDescription>
          </DialogHeader>
       
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>{
                   loading ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "cancel"
                }</Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>{
                   loading ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait</>) : "delete"
                }</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
