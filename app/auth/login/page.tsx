import { Suspense } from "react"
import AuthForm from "@/components/auth-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-brewing flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-md">
        <Card className="glass-card border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white text-shadow">Welcome to BevRate</CardTitle>
            <CardDescription className="text-gray-200 text-shadow">
              Sign in to your account or create a new one
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
              <AuthForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
