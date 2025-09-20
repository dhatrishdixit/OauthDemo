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
import { ReloadIcon } from "@radix-ui/react-icons";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const schema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

  const navigate = useNavigate();
  type formFields = z.infer<typeof schema>;

  const { register, handleSubmit, setError, formState } = useForm<formFields>({
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

  const onSubmit: SubmitHandler<formFields> = async (data) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/v1/auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          confirmPassword: data.confirmPassword,
          type:"PasswordLogin"
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`Hi, ${response.data.data.name}! Your account has been created on`, {
        description: formattedDate,
        action: {
          label: "Continue",
          onClick: () => null,
        },
      });

      // Navigate after a short delay to let user see the success message
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage = error?.response?.data?.message || "Registration failed. Please try again.";
        
        // Only show toast for server errors, don't set root error
        toast.error("Registration Error", {
          description: errorMessage,
          action: {
            label: "Dismiss",
            onClick: () => {},
          },
        });

        // Optionally, you can set specific field errors based on the server response
        // For example, if the server returns that email already exists:
        if (errorMessage.toLowerCase().includes('email')) {
          setError("email", {
            message: errorMessage,
          });
        }
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
        });
      }
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-2xl dark:bg-gray-800 dark:border-gray-700 shadow-lg transition-colors duration-300">
        <CardHeader>
          <CardTitle className="text-center text-gray-900 dark:text-white">
            Create an account
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="flex flex-col gap-6">
              <div className="flex gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name" className="text-gray-900 dark:text-gray-100">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-600 text-sm">{errors.name.message}</p>
                  )}
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="email" className="text-gray-900 dark:text-gray-100">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="password" className="text-gray-900 dark:text-gray-100">
                  Password
                </Label>
                <div className="space-y-1">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    {...register("password")}
                  />
                  <div className="h-5">
                    {errors.password && (
                      <p className="text-red-600 text-sm">{errors.password.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="confirm-password" className="text-gray-900 dark:text-gray-100">
                  Confirm Password
                </Label>
                <div className="space-y-1">
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    {...register("confirmPassword")}
                  />
                  <div className="h-5">
                    {errors.confirmPassword && (
                      <p className="text-red-600 text-sm">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>
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
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign Up"
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
                >
                  <FcGoogle />
                  {isSubmitting ? (
                    <>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign up with Google"
                  )}
                </Button>
              </div>
            </div>

            <div className="mt-4 text-center text-sm text-gray-900 dark:text-gray-100">
              Already have an account?{" "}
              <a href="#" className="underline underline-offset-4 cursor-pointer">
                Log in
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}