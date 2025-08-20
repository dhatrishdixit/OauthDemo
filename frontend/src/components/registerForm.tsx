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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="dark:border-white">
        <CardHeader>
          <CardTitle className="dark:text-white text-center">Create an account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  className="text-white"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="text-white"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="password" className="text-white">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="text-white" 
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="confirm-password" className="text-white">Confirm Password</Label>
                <Input 
                  id="confirm-password" 
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="text-white" 
                />
              </div>

              <div className="flex flex-col gap-3 items-center">
                <Button type="submit" variant="outline" className="w-full text-white w-fit cursor-pointer">
                  Sign Up
                </Button>
                <div className="text-white flex justify-center items-center gap-4">
                  <Separator className="text-white bg-white"/>
                  or
                  <Separator className="text-white bg-white"/>
                </div>
                
                <Button variant="outline" className="w-full text-white cursor-pointer">
                  <FcGoogle /> Sign up with Google
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
