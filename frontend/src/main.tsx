import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from "@/components/ui/sonner"
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from './components/AuthLayout'
import { LoginPage } from './Pages/loginPage';
import { RegisterPage } from './Pages/registerPage'
import { UserInfoPage } from './Pages/userInfoPage'
import { AdminLoginPage } from './Pages/adminLogin'




const router = createBrowserRouter([
  {
    path:"/login",
    element:(
      <AuthLayout authentication={false}>
          <LoginPage/>
      </AuthLayout>
    )
  },
  {
    path:"/register",
    element:(
      <AuthLayout authentication={false}>
        <RegisterPage/>
      </AuthLayout>
    )
  },
  {
    path:"/",
    element:(
      <AuthLayout authentication={true}>
        <UserInfoPage/>
      </AuthLayout>
    )
  },
  {
    path:"/adminLogin",
    element:(
      
      <AuthLayout authentication={true}>
        <AdminLoginPage/>
      </AuthLayout>
    )
  },
  {
    path:"/adminDashboard",
    element:(
      <AuthLayout authentication={true}>
        <AdminLoginPage/>
      </AuthLayout>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router}/>
       <Toaster/>
    </ThemeProvider>
  </StrictMode>,
)
