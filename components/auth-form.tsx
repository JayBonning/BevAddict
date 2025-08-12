"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function AuthForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSignUp = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string

    if (!email || !password || !fullName) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    })

    if (error) {
      setError(error.message)
    } else {
      toast.success("Account created! Please check your email to verify your account.")
      router.push("/")
    }

    setIsLoading(false)
  }

  const handleSignIn = async (formData: FormData) => {
    setIsLoading(true)
    setError(null)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      toast.success("Welcome back!")
      router.push("/")
    }

    setIsLoading(false)
  }

  return (
    <Tabs defaultValue="signin" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white/10 border-white/20">
        <TabsTrigger
          value="signin"
          className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
        >
          Sign In
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>

      {error && (
        <Alert className="mt-4 bg-red-500/20 border-red-500/50 text-white">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <TabsContent value="signin">
        <form action={handleSignIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signin-email" className="text-white text-shadow">
              Email
            </Label>
            <Input
              id="signin-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signin-password" className="text-white text-shadow">
              Password
            </Label>
            <Input
              id="signin-password"
              name="password"
              type="password"
              placeholder="Enter your password"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </TabsContent>

      <TabsContent value="signup">
        <form action={handleSignUp} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="signup-name" className="text-white text-shadow">
              Full Name
            </Label>
            <Input
              id="signup-name"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email" className="text-white text-shadow">
              Email
            </Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-password" className="text-white text-shadow">
              Password
            </Label>
            <Input
              id="signup-password"
              name="password"
              type="password"
              placeholder="Create a password"
              required
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-300"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}
