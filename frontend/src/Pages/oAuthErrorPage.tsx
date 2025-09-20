import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function OAuthErrorPage() {

   const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="text-center max-w-md px-6">
        <h1 className="text-3xl font-bold text-white mb-4">
          Authentication Failed
        </h1>
        <p className="text-gray-300 mb-6">
          Something went wrong while trying to log you in. Please try again by
          returning to the login page.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
         
          <Button 
            onClick={() => navigate("/login")} 
            variant="destructive"
            className="rounded-2xl"
          >
            <ArrowLeft/> Go to Login
          </Button>
        </div>
      </div>
    </div>
  )
}
