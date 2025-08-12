"use client"

import type React from "react"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { CalendarIcon, MapPin, Star, Camera, ChevronsUpDown, X } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const beverageTypes = [
  { value: "coffee", label: "Coffee" },
  { value: "tea", label: "Tea" },
  { value: "soda", label: "Soda" },
  { value: "juice", label: "Juice" },
  { value: "beer", label: "Beer" },
  { value: "wine", label: "Wine" },
  { value: "cocktail", label: "Cocktail" },
  { value: "smoothie", label: "Smoothie" },
  { value: "energy", label: "Energy Drink" },
  { value: "water", label: "Water" },
  { value: "other", label: "Other" },
]

const popularLocations = [
  "Local Coffee Shop",
  "Starbucks",
  "Home",
  "Restaurant",
  "Bar",
  "Grocery Store",
  "Gas Station",
  "Airport",
  "Hotel",
  "Office",
]

const formSchema = z.object({
  beverageName: z.string().min(1, "Beverage name is required").max(100, "Name too long"),
  manufacturer: z.string().min(1, "Manufacturer is required").max(100, "Manufacturer name too long"),
  beverageType: z.string().min(1, "Please select a beverage type"),
  location: z.string().optional(),
  dateConsumed: z.date().optional(),
  rating: z.number().min(0).max(10),
  summary: z.string().max(500, "Summary too long").optional(),
  tags: z.array(z.string()).optional(),
  price: z.number().min(0).optional(),
  wouldRecommend: z.boolean().default(true),
})

type FormData = z.infer<typeof formSchema>

export default function EnhancedReviewForm() {
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [locationOpen, setLocationOpen] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      beverageName: "",
      manufacturer: "",
      beverageType: "",
      location: "",
      rating: 5,
      summary: "",
      tags: [],
      price: undefined,
      wouldRecommend: true,
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setImage(null)
    setImagePreview(null)
  }

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()]
      setTags(updatedTags)
      form.setValue("tags", updatedTags)
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const updatedTags = tags.filter((tag) => tag !== tagToRemove)
    setTags(updatedTags)
    form.setValue("tags", updatedTags)
  }

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    setUploadProgress(0)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error("Not authenticated")

      let imageUrl = null

      // Upload image if provided
      if (image) {
        setUploadProgress(25)
        const fileExt = image.name.split(".").pop()
        const fileName = `${user.id}-${Date.now()}.${fileExt}`

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("beverage-images")
          .upload(fileName, image)

        if (uploadError) throw uploadError

        setUploadProgress(50)

        const {
          data: { publicUrl },
        } = supabase.storage.from("beverage-images").getPublicUrl(fileName)

        imageUrl = publicUrl
      }

      setUploadProgress(75)

      // Insert review
      const { error } = await supabase.from("reviews").insert({
        user_id: user.id,
        beverage_name: data.beverageName,
        manufacturer: data.manufacturer,
        beverage_type: data.beverageType,
        location: data.location || null,
        date_consumed: data.dateConsumed || null,
        rating: data.rating,
        summary: data.summary || null,
        tags: data.tags || [],
        price: data.price || null,
        would_recommend: data.wouldRecommend,
        image_url: imageUrl,
      })

      if (error) throw error

      setUploadProgress(100)

      toast.success("Review added successfully!", {
        description: `Your review for ${data.beverageName} has been published.`,
      })

      router.push("/")
    } catch (error) {
      toast.error("Failed to add review", {
        description: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const rating = form.watch("rating")

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-6 h-6" />
          Share Your Beverage Experience
        </CardTitle>
        <CardDescription>Create a detailed review to help others discover great beverages</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="beverageName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beverage Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Coca-Cola Classic" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="manufacturer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Manufacturer *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., The Coca-Cola Company" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="beverageType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Beverage Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select beverage type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {beverageTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            {...field}
                            onChange={(e) =>
                              field.onChange(e.target.value ? Number.parseFloat(e.target.value) : undefined)
                            }
                          />
                        </FormControl>
                        <FormDescription>Price in your local currency</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Location and Date */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Where & When</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Location (Optional)</FormLabel>
                        <Popover open={locationOpen} onOpenChange={setLocationOpen}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn("justify-between", !field.value && "text-muted-foreground")}
                              >
                                {field.value || "Select or type location"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command>
                              <CommandInput
                                placeholder="Search or type location..."
                                value={field.value}
                                onValueChange={field.onChange}
                              />
                              <CommandList>
                                <CommandEmpty>
                                  <Button
                                    variant="ghost"
                                    className="w-full"
                                    onClick={() => {
                                      setLocationOpen(false)
                                    }}
                                  >
                                    Use "{field.value}"
                                  </Button>
                                </CommandEmpty>
                                <CommandGroup>
                                  {popularLocations.map((location) => (
                                    <CommandItem
                                      key={location}
                                      value={location}
                                      onSelect={() => {
                                        field.onChange(location)
                                        setLocationOpen(false)
                                      }}
                                    >
                                      <MapPin className="mr-2 h-4 w-4" />
                                      {location}
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dateConsumed"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date Consumed (Optional)</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <Separator />

              {/* Rating */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Rating</h3>
                <FormField
                  control={form.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        Rating: {field.value}/10
                        <Badge variant={field.value >= 8 ? "default" : field.value >= 6 ? "secondary" : "destructive"}>
                          {field.value >= 8
                            ? "Excellent"
                            : field.value >= 6
                              ? "Good"
                              : field.value >= 4
                                ? "Fair"
                                : "Poor"}
                        </Badge>
                      </FormLabel>
                      <FormControl>
                        <div className="px-3">
                          <Slider
                            min={0}
                            max={10}
                            step={0.5}
                            value={[field.value]}
                            onValueChange={(value) => field.onChange(value[0])}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-muted-foreground mt-1">
                            <span>0</span>
                            <span>5</span>
                            <span>10</span>
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Separator />

              {/* Review Content */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Your Review</h3>
                <FormField
                  control={form.control}
                  name="summary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Summary (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share your thoughts about this beverage... What did you like or dislike? How was the taste, texture, or overall experience?"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>{field.value?.length || 0}/500 characters</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Tags */}
              <div>
                <h4 className="font-medium mb-3">Tags (Optional)</h4>
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., sweet, refreshing, organic)"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" variant="outline" onClick={addTag}>
                    Add
                  </Button>
                </div>
              </div>

              <Separator />

              {/* Photo Upload */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Photo (Optional)</h3>
                <div className="space-y-4">
                  {imagePreview ? (
                    <div className="relative">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={removeImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                      <div className="text-center">
                        <Camera className="mx-auto h-12 w-12 text-muted-foreground/50" />
                        <div className="mt-4">
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="mt-2 block text-sm font-medium text-foreground">
                              Upload a photo of your beverage
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">PNG, JPG, GIF up to 10MB</span>
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            {loading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="w-full" />
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" className="flex-1" disabled={loading}>
                    {loading ? "Publishing..." : "Publish Review"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Publish Your Review?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Your review will be visible to all users. You can edit or delete it later from your profile.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={form.handleSubmit(onSubmit)}>Publish Review</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <Button type="button" variant="outline" onClick={() => router.push("/")}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
