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
// import {z} from 'zod';
// import {zodResolver} from "@hookform/resolvers/zod";


export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  // const schema = z.object({
  //   email : z.string().email(),
    
  // })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="dark:border-white">
        <CardHeader>
          <CardTitle className="dark:text-white text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
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
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">Password</Label>
                </div>
                <Input id="password" type="password" className="text-white" placeholder="password" required />
              </div>
              <div className="flex flex-col gap-3 items-center">
                <Button type="submit" variant="outline" className="w-full text-white cursor-pointer">
                  LogIn
                </Button>
                <div className="text-white flex justify-center items-center gap-4">
                  <Separator className=" text-white bg-white"/>
                  or
                  <Separator className=" text-white bg-white"/>
                </div>
                
               
                <Button variant="outline" className="w-full text-white cursor-pointer">
                  <FcGoogle/> Signin with Google
                </Button>
                
              </div>
            </div>
            <div className="mt-4 text-center text-sm text-white">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}