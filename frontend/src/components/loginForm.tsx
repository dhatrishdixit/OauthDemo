import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { FcGoogle } from "../assets/FcGoogle";
import { z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuth } from "@/hooks/authState";
import { ReloadIcon } from "@radix-ui/react-icons";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
  });

  const navigate = useNavigate();
  type formFields = z.infer<typeof schema>;

  const { register, handleSubmit, setError, formState } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const { login } = useAuth();
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

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/v1/auth/login`,
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      login(response.data.data);
      toast(`Hi, ${response.data.data.name} you have been logged in`, {
        description: formattedDate,
        action: {
          label: "Ok",
          onClick: () => {},
        },
      });

      navigate("/");
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

 

  return (
    <div
      className={cn(
        "flex flex-col gap-6 bg-gray-100 dark:bg-gray-900 max-h-screen p-6 transition-colors duration-300",
        className
      )}
      {...props}
    >
      <Card className="dark:bg-gray-800 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">
            Login to your account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label
                  htmlFor="email"
                  className="text-gray-900 dark:text-gray-100"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  autoComplete="off"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    Password
                  </Label>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  required
                  className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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
                  className="w-full text-white cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>

                <div className="text-gray-900 dark:text-gray-100 flex justify-center items-center gap-4">
                  <Separator className="bg-gray-300 dark:bg-gray-600" />
                  or
                  <Separator className="bg-gray-300 dark:bg-gray-600" />
                </div>

                <Button
                  variant="outline"
                  className="w-full text-white cursor-pointer"
                  disabled={isSubmitting}
                  type="button"
                  onClick={()=>{
                    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&prompt=consent&response_type=code&client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&scope=${import.meta.env.VITE_GOOGLE_LOGIN_SCOPE}`
                  }}
                >
                  <FcGoogle />
                  {isSubmitting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    "Signin with Google"
                  )}
                </Button>
              </div>
            </div>

            
              <div className="mt-4 text-center text-sm text-gray-900 dark:text-gray-100" >
              Don&apos;t have an account?{" "}
              <p className="underline underline-offset-4 cursor-pointer" onClick={()=>navigate("/register")}>
                Sign up
              </p>
            </div>  
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
