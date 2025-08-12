'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Upload } from 'lucide-react'

export default function ReviewForm() {
  const [beverageName, setBeverageName] = useState('')
  const [manufacturer, setManufacturer] = useState('')
  const [location, setLocation] = useState('')
  const [rating, setRating] = useState([5])
  const [summary, setSummary] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()
  const supabase = createClient()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      let imageUrl = null

      // Upload image if provided
      if (image) {
        const fileExt = image.name.split('.').pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('beverage-images')
          .upload(fileName, image)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('beverage-images')
          .getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      // Insert review
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          beverage_name: beverageName,
          manufacturer,
          location: location || null,
          rating: rating[0],
          summary: summary || null,
          image_url: imageUrl,
        })

      if (error) throw error

      toast({
        title: 'Success',
        description: 'Review added successfully!',
      })

      router.push('/')
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to add review',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Share Your Beverage Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="beverage-name">Beverage Name *</Label>
            <Input
              id="beverage-name"
              value={beverageName}
              onChange={(e) => setBeverageName(e.target.value)}
              placeholder="e.g., Coca-Cola Classic"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="manufacturer">Manufacturer *</Label>
            <Input
              id="manufacturer"
              value={manufacturer}
              onChange={(e) => setManufacturer(e.target.value)}
              placeholder="e.g., The Coca-Cola Company"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location (Optional)</Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g., Local Coffee Shop, New York"
            />
          </div>

          <div className="space-y-4">
            <Label>Rating: {rating[0]}/10</Label>
            <Slider
              value={rating}
              onValueChange={setRating}
              max={10}
              min={0}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Review Summary (Optional)</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Share your thoughts about this beverage..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Photo (Optional)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <Label
                htmlFor="image"
                className="flex items-center gap-2 px-4 py-2 border border-input rounded-md cursor-pointer hover:bg-accent"
              >
                <Upload className="w-4 h-4" />
                {image ? image.name : 'Choose Image'}
              </Label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Adding Review...' : 'Add Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
