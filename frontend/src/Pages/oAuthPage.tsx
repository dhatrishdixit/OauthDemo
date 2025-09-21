import { Loader } from '@/components/loader'
import axios from 'axios';
import { useEffect,useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

export function OAuthPage() {
    
  const navigate = useNavigate();

  const oauthHandler = useCallback(async () => {
    const searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of searchParams) {
        if(key == "code"){
           try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URI}/v1/auth/googleOAuth`,{
                 authorizationCode : value
           },{
            withCredentials:true
           })
          
           navigate("/");
           } catch (error) {
            console.log(error)
           }

           return ;
        }else if(key=="error"){
           navigate("/auth/google/error")
        }
    }

  }, [navigate])
 
  
  useEffect(() => {
    
    oauthHandler()
   

  }, [oauthHandler]);



  return (
    <div>
      <Loader/>
    </div>
  )
}


