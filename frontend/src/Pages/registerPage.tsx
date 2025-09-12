import { RegisterForm } from '@/components/registerForm'
import React from 'react'

export function RegisterPage() {
  return (
      <div className="flex h-screen w-screen items-center justify-center dark:bg-[var(--background)]">
        <div className="w-full max-w-sm">
           <RegisterForm />
        </div>
      </div>
  )
  
}

