import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Users, Coffee, TrendingUp } from "lucide-react"
import Link from "next/link"
import ReviewFeed from "@/components/review-feed"

export default async function HomePage() {
  const supabase = await createClient()

  let user = null
  let connectionError = false

  try {
    const {
      data: { user: authUser },
      error,
    } = await supabase.auth.getUser()
    if (error) {
      console.log("Auth error:", error.message)
      connectionError = true
    } else {
      user = authUser
    }
  } catch (error) {
    console.log("Connection error:", error)
    connectionError = true
  }

  if (connectionError) {
    return (
      <div className="min-h-screen bg-barrel-cellar flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center">
          <Card className="glass-card border-white/20 max-w-md mx-auto">
            <CardHeader>
              <CardTitle className="text-white text-shadow">Connection Issue</CardTitle>
              <CardDescription className="text-gray-200">
                Unable to connect to the database. Please check your configuration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                <Link href="/config-error">Fix Configuration</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-barrel-cellar">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6 text-shadow-lg">Welcome to BevRate</h1>
            <p className="text-xl text-gray-200 mb-8 text-shadow">
              Discover, rate, and review your favorite beverages. Connect with fellow enthusiasts and share your taste
              experiences.
            </p>
            {!user && (
              <div className="flex gap-4 justify-center">
                <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                  <Link href="/auth/login">Get Started</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  <Link href="/reviews/new">Browse Reviews</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="glass-card border-white/20 text-center">
                <CardContent className="p-6">
                  <Coffee className="w-8 h-8 text-amber-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">1,000+</h3>
                  <p className="text-gray-200">Beverages Reviewed</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/20 text-center">
                <CardContent className="p-6">
                  <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">500+</h3>
                  <p className="text-gray-200">Active Users</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/20 text-center">
                <CardContent className="p-6">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">5,000+</h3>
                  <p className="text-gray-200">Reviews Written</p>
                </CardContent>
              </Card>
              <Card className="glass-card border-white/20 text-center">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <h3 className="text-2xl font-bold text-white">4.8</h3>
                  <p className="text-gray-200">Average Rating</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Recent Reviews */}
        {user && (
          <section className="py-16 px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center text-shadow">Recent Reviews</h2>
              <Suspense
                fallback={
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2">Loading reviews...</p>
                  </div>
                }
              >
                <ReviewFeed />
              </Suspense>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="glass-card border-white/20">
              <CardHeader>
                <CardTitle className="text-2xl text-white text-shadow">Ready to Start Rating?</CardTitle>
                <CardDescription className="text-gray-200 text-shadow">
                  Join our community of beverage enthusiasts and share your taste experiences.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {user ? (
                  <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                    <Link href="/reviews/new">Write Your First Review</Link>
                  </Button>
                ) : (
                  <Button asChild size="lg" className="bg-white/20 hover:bg-white/30 text-white border-white/20">
                    <Link href="/auth/login">Sign Up Now</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
