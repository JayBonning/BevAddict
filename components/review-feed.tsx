import { createClient } from '@/lib/supabase/server'
import ReviewCard from './review-card'
import { Card, CardContent } from '@/components/ui/card'

export default async function ReviewFeed() {
  try {
    const supabase = await createClient()
    
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:user_id (
          id,
          email,
          full_name
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error loading reviews:', error)
      return (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">Error loading reviews. Please check your database setup.</p>
          </CardContent>
        </Card>
      )
    }

    if (!reviews || reviews.length === 0) {
      return (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No reviews yet. Be the first to add one!</p>
          </CardContent>
        </Card>
      )
    }

    return (
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    )
  } catch (error) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Database connection error. Please check your Supabase configuration.</p>
        </CardContent>
      </Card>
    )
  }
}
