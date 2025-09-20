import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { useAdminState } from "@/hooks/adminState";
import { useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader } from "@/components/loader";
import { ArrowLeft } from "lucide-react";

export function AdminLoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const schema = z.object({
    username: z.string(),
    password: z.string().min(1),
  });

  const navigate = useNavigate();

  const {isAdminVerified,isLoading} = useAdminState();
 
  type formFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    setError,
    formState,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const { errors, isSubmitting } = formState;

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  const now = new Date();
  const formattedDate = now.toLocaleString("en-US", options);

  useEffect(()=>{
    console.log("isAdminVerified",isAdminVerified)
    console.log(isLoading == false && isAdminVerified)
    if(isLoading == false && isAdminVerified) navigate("/adminDashboard");
  },[isAdminVerified,isLoading,navigate])

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URI}/v1/admin/login`,{
          username:data.username,
          password:data.password
      },
       {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      
      toast(`Hi, Admin you are granted admin priviledges`, {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });
      
      navigate("/adminDashboard")
    } catch (error) {
       if (error instanceof AxiosError) {
               toast("Error during login", {
                 description: error?.response?.data.message,
                 action: {
                   label: "Ok",
                   onClick: () => {},
                 },
               });
       
               setError("root", {
                 message: error?.response?.data.message,
               });
             }
    }
  };

  return isLoading ? (<div><Loader/></div>) : (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-gray-900">
    <div
      className={cn(
        "flex flex-col justify-center gap-6 min-h-screen p-6 transition-colors duration-300",
        className
      )}
      {...props}
    >
      <Button variant="outline" className="absolute top-4 right-4" onClick={()=>navigate("/")}><ArrowLeft /> Go Back to Info Page</Button>
      <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">
            Login to Admin account
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="username" className="text-gray-900 dark:text-gray-100">
                  Username
                </Label>
                <Input
                  id="username"
                  type="username"
                  placeholder="name"
                  required
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  autoComplete="off"
                  {...register("username")}
                />
                {errors.username && (
                  <p className="text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  placeholder="••••••••"
                  required
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-600">{errors.password.message}</p>
                )}
              </div>

              <div className="text-center">
                {errors.root && (
                  <p className="text-red-600 text-center">
                    {JSON.stringify(errors.root.message)}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3 items-center">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Login As Admin"
                  )}
                </Button>

               
              </div>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
