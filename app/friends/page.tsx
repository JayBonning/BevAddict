import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import FriendSearch from "@/components/friend-search"
import FriendsList from "@/components/friends-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function FriendsPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error || !user) {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-barrel-cellar py-8">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-shadow">Friends & Community</h1>
          <p className="text-gray-200 text-shadow">
            Connect with fellow beverage enthusiasts and discover new favorites
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-shadow">Find Friends</CardTitle>
              <CardDescription className="text-gray-200">Search for other users to connect with</CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2 text-sm">Loading search...</p>
                  </div>
                }
              >
                <FriendSearch />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-shadow">Your Friends</CardTitle>
              <CardDescription className="text-gray-200">
                Manage your connections and see their latest reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2 text-sm">Loading friends...</p>
                  </div>
                }
              >
                <FriendsList />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
