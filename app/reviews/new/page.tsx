import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import EnhancedReviewForm from "@/components/enhanced-review-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function NewReviewPage() {
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
      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <Card className="glass-card border-white/20">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-white text-shadow">Write a Review</CardTitle>
            <CardDescription className="text-gray-200 text-shadow">
              Share your experience with a beverage and help others discover great drinks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense
              fallback={
                <div className="text-center text-white">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                  <p className="mt-2">Loading form...</p>
                </div>
              }
            >
              <EnhancedReviewForm />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
