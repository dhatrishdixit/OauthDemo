import { LoginPage } from './Pages/loginPage';



// pages we will have 
// login , register , oauthPage , oauthErrorPage , HomePage , adminPage , adminLoginPage


function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-[var(--background)]">
      <LoginPage/>
    </div>
  )
}

export default App
