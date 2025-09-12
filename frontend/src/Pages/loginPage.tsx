import { LoginForm } from '@/components/loginForm'

export function LoginPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-[var(--background)]">
    <div className="w-full max-w-sm">
               <LoginForm />
    </div>
    </div>
  )
}

