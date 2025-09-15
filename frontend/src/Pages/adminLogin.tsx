import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Separator } from "@radix-ui/react-separator";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";

export function AdminLoginPage(){

     const schema = z.object({
    email : z.email(),
    password:z.string().min(1)
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

   const schema = z.object({
      email : z.email(),
      password:z.string().min(1)
   })

   type formFields = z.infer<typeof schema>;
    
  const  { errors, isSubmitting } = formState;

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="dark:border-white">
        <CardHeader>
          <CardTitle className="dark:text-white text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-white"
                  autoComplete="off"

                  {...register("email")}
                />
                {
            errors.email && <p className="text-red-600">{errors.email.message}</p>
            }
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">Password</Label>
                </div>
                <Input 
                id="password" 
                type="password" 
                className="text-white" 
                placeholder="••••••••" 
                required
                {...register("password")}
                />
                {
                  errors.password && <p className="text-red-600">{errors.password.message}</p>
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
                <Button type="submit" variant="outline" className="w-full text-white cursor-pointer" disabled={isSubmitting}>
                  {
                    isSubmitting ? ( <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    Please wait</>) : "Login As Admin"
                    }
                </Button>
                <div className="text-white flex justify-center items-center gap-4">
                  <Separator className=" text-white bg-white"/>
                  or
                  <Separator className=" text-white bg-white"/>
                </div>
                
               
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-white">
              Don&apos;t have an account?{" "}
              <p  className="underline underline-offset-4">
                Sign up
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}