import { Suspense } from "react"
import AuthForm from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brewing bg-cover bg-center bg-fixed relative">
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2 text-shadow-lg">🍹 Bev Addict</h1>
            <p className="text-white/90 text-lg text-shadow">Your beverage journey starts here</p>
          </div>

          <div className="glass-card p-8 rounded-xl">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
              <AuthForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
