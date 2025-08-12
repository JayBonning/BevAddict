import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Star, MapPin } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ReviewCardProps {
  review: {
    id: string
    beverage_name: string
    manufacturer: string
    location?: string
    rating: number
    summary?: string
    image_url?: string
    created_at: string
    profiles: {
      id: string
      email: string
      full_name?: string
    }
  }
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 10 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>
              {review.profiles.full_name?.charAt(0) || review.profiles.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold">
              {review.profiles.full_name || review.profiles.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {new Date(review.created_at).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="secondary" className="ml-auto">
            {review.rating}/10
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {review.image_url && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={review.image_url || "/placeholder.svg"}
              alt={review.beverage_name}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <div>
          <h3 className="text-xl font-bold">{review.beverage_name}</h3>
          <p className="text-muted-foreground">by {review.manufacturer}</p>
          {review.location && (
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{review.location}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          {renderStars(review.rating)}
          <span className="ml-2 text-sm font-medium">{review.rating}/10</span>
        </div>

        {review.summary && (
          <p className="text-sm leading-relaxed">{review.summary}</p>
        )}

        <div className="pt-2">
          <Link 
            href={`/reviews/${review.id}`}
            className="text-sm text-primary hover:underline"
          >
            View comments
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
