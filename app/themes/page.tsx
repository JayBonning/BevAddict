import { Suspense } from "react"
import ThemeBuilder from "@/components/theme-builder"
import ThemeSelector from "@/components/theme-selector"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ThemesPage() {
  return (
    <div className="min-h-screen bg-barrel-cellar py-8">
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 text-shadow">Theme Customization</h1>
          <p className="text-gray-200 text-shadow">Personalize your BevRate experience with custom themes and colors</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-shadow">Theme Builder</CardTitle>
              <CardDescription className="text-gray-200">
                Create your own custom theme with our advanced color tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2">Loading theme builder...</p>
                  </div>
                }
              >
                <ThemeBuilder />
              </Suspense>
            </CardContent>
          </Card>

          <Card className="glass-card border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-shadow">Preset Themes</CardTitle>
              <CardDescription className="text-gray-200">
                Choose from our curated collection of beverage-inspired themes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense
                fallback={
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
                    <p className="mt-2">Loading themes...</p>
                  </div>
                }
              >
                <ThemeSelector />
              </Suspense>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
