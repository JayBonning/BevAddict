import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, Users, Star, TrendingUp } from "lucide-react"

export default async function HomePage() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error || !user) {
      redirect("/auth/login")
    }

    // Get user profile
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    // Get recent reviews count
    const { count: reviewCount } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.id)

    // Get friends count
    const { count: friendsCount } = await supabase
      .from("friendships")
      .select("*", { count: "exact", head: true })
      .or(`user_id.eq.${user.id},friend_id.eq.${user.id}`)
      .eq("status", "accepted")

    return (
      <div className="min-h-screen bg-barrel-cellar bg-cover bg-center bg-fixed relative">
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 text-shadow-lg">Welcome to Bev Addict</h1>
            <p className="text-white/90 text-xl text-shadow max-w-2xl mx-auto">
              Discover, rate, and share your favorite beverages with fellow enthusiasts
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {/* Stats Cards */}
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Your Reviews</CardTitle>
                <Star className="h-4 w-4 text-yellow-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{reviewCount || 0}</div>
                <p className="text-xs text-white/70">Total beverages reviewed</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Friends</CardTitle>
                <Users className="h-4 w-4 text-blue-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{friendsCount || 0}</div>
                <p className="text-xs text-white/70">Connected enthusiasts</p>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">Streak</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">0</div>
                <p className="text-xs text-white/70">Days reviewing</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-12">
            <Link href="/reviews/new">
              <Button className="w-full h-16 text-lg glass-card border-white/20 hover:bg-white/20">
                <Plus className="w-6 h-6 mr-2" />
                Add Review
              </Button>
            </Link>
            <Link href="/friends">
              <Button
                variant="outline"
                className="w-full h-16 text-lg glass-card border-white/20 hover:bg-white/20 bg-transparent"
              >
                <Users className="w-6 h-6 mr-2" />
                Find Friends
              </Button>
            </Link>
            <Link href="/themes">
              <Button
                variant="outline"
                className="w-full h-16 text-lg glass-card border-white/20 hover:bg-white/20 bg-transparent"
              >
                <Star className="w-6 h-6 mr-2" />
                Customize
              </Button>
            </Link>
            <Link href="/setup">
              <Button
                variant="outline"
                className="w-full h-16 text-lg glass-card border-white/20 hover:bg-white/20 bg-transparent"
              >
                <TrendingUp className="w-6 h-6 mr-2" />
                Setup
              </Button>
            </Link>
          </div>

          {/* Welcome Message */}
          <Card className="glass-card max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-center">Welcome, {profile?.full_name || user.email}! 🍻</CardTitle>
              <CardDescription className="text-white/80 text-center">
                Ready to discover your next favorite beverage?
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-white/90 mb-4">
                Start by adding your first review or connecting with other beverage enthusiasts.
              </p>
              <Badge className="bg-amber-500/20 text-amber-200 border-amber-400/30">New Member</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  } catch (error) {
    console.error("Homepage error:", error)
    redirect("/config-error")
  }
}
