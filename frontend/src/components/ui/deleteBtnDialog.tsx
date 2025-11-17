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
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { toast } from "sonner"

type DeleteBtn = {
  name : string ,
  id : string ,
  setRefresh : React.Dispatch<React.SetStateAction<number>>,
  setLoading : React.Dispatch<React.SetStateAction<boolean>>
}

export function DeleteBtnDialog(props:DeleteBtn) {

  const [isOpen, setIsOpen] = useState(false);

  const {name, id, setRefresh, setLoading} = props;

  const handleDelete = async () => {
    setIsOpen(false);
    setLoading(true);
    
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/deleteUser/${id}`,{
        withCredentials:true
      });

      toast(`user is deleted`,{
        action:{
          label:"Ok",
          onClick : ()=>{}
        }
      })
      
      setRefresh(Math.random());

    } catch (error) {
      if (error instanceof AxiosError) {
        toast("Error during deleting user", {
          description: error?.response?.data.message,
          action: {
            label: "Ok",
            onClick: () => {},
          },
        });
      }
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form> 
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
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}