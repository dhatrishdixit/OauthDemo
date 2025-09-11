import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "./ui/separator"
import { FcGoogle } from "../assets/FcGoogle"
import {z} from 'zod';
import { type SubmitHandler,useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import axios, { AxiosError } from "axios"
import { ReloadIcon } from "@radix-ui/react-icons";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

    const schema = z.object({
      name:z.string().min(1),
      email : z.email(),
      password:z.string().min(1),
      confirmPassword:z.string().min(1)
    })

      const navigate = useNavigate();

      type formFields = z.infer<typeof schema>;
      

       const {
        register,
        handleSubmit,
        setError,
        formState,
        } = useForm<formFields>({
              resolver: zodResolver(schema),
        }); 

          const  { errors, isSubmitting } = formState;

          const options: Intl.DateTimeFormatOptions = { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: '2-digit', 
              hour: '2-digit', 
              minute: '2-digit', 
              hour12: true 
          };

const now = new Date();
const formattedDate = now.toLocaleString('en-US', options);


   const onSubmit:SubmitHandler<formFields> = async (data) => {
        try {

          if(data.password !== data.confirmPassword){
            setError("confirmPassword",{
            message:"Both Passwords should be the same"
          })
          return ;
          }
          
           const response = await axios.post(`${process.env.VITE_BACKEND_URI}/v1/auth/register`,{
               name:data.name,
               email:data.email,
               password:data.password,
               confirmPassword:data.confirmPassword
           },{
             headers:{
              "Content-Type":"application/json"
             }
           });

           toast(`Hi , ${response.data.data.name} your account has been created on`,{
            description: formattedDate,
            action: {
            label: "Ok",
            onClick: () => {},
          },
          })

          navigate("/login")


        } catch (error) {
            if(error instanceof AxiosError){
              toast("Error during login ",{
                description: error?.response?.data.message,
                action:{
                  label :"Ok",
                  onClick : () => {}
                }
              })

              setError("root",{
                message : error?.response?.data.message
              })
            }
        }
  }


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="dark:border-white">
        <CardHeader>
          <CardTitle className="dark:text-white text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="text-white"
                  {...register("name")}
                />
                {
            errors.name && <p className="text-red-600">{errors.name.message}</p>
            }
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-white"
                  {...register("email")}
                />
                {
            errors.email && <p className="text-red-600">{errors.email.message}</p>
            }
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="text-white"
                  {...register("password")}
                />
                {
            errors.password && <p className="text-red-600">{errors.password.message}</p>
            }
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="text-white" 
                  {...register("confirmPassword")}
                />
                {
            errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>
            }
              </div>

              <div className="text-center"> 
                 {
                  errors.root && <p className="text-red-600 text-center">
                    {JSON.stringify(errors.root.message)}
                  </p>
                }
                </div>

              <div className="flex flex-col gap-3 items-center">
                <Button type="submit" variant="outline" className="w-full text-white w-fit cursor-pointer">
                  {
                    isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait</>) : "Sign Up"
                    }
                </Button>
                <div className="text-white flex justify-center items-center gap-4">
                  <Separator className="text-white bg-white"/>
                  or
                  <Separator className="text-white bg-white"/>
                </div>
                
                <Button variant="outline" className="w-full text-white cursor-pointer">
                  <FcGoogle /> {
                    isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait</>) : "Sign up with Google"
                    }
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-white">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
