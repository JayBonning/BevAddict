'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/lib/themes/theme-context'
import { Trash2, Palette, Sun, Moon } from 'lucide-react'
import { defaultThemes } from '@/lib/themes/theme-config'

export default function ThemeSelector() {
  const { currentTheme, themes, setTheme, removeCustomTheme, mode, setMode } = useTheme()

  const isCustomTheme = (themeId: string) => {
    return !defaultThemes.find(t => t.id === themeId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Theme Settings</h2>
          <p className="text-muted-foreground">Choose and manage your themes</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant={mode === 'light' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('light')}
          >
            <Sun className="w-4 h-4 mr-2" />
            Light
          </Button>
          <Button
            variant={mode === 'dark' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('dark')}
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((theme) => (
          <Card 
            key={theme.id} 
            className={`cursor-pointer transition-all hover:shadow-md ${
              currentTheme.id === theme.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setTheme(theme.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    {theme.name}
                    {currentTheme.id === theme.id && (
                      <Badge variant="secondary" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {theme.description}
                  </CardDescription>
                </div>
                
                {isCustomTheme(theme.id) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      removeCustomTheme(theme.id)
                    }}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3">
                {/* Color Preview */}
                <div className="flex gap-1">
                  {[
                    theme.colors.light.primary,
                    theme.colors.light.secondary,
                    theme.colors.light.accent,
                    theme.colors.light.muted,
                  ].map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border border-border"
                      style={{ backgroundColor: `hsl(${color})` }}
                    />
                  ))}
                </div>
                
                {/* Theme Features */}
                <div className="flex flex-wrap gap-1">
                  {theme.fonts?.heading && (
                    <Badge variant="outline" className="text-xs">
                      {theme.fonts.heading}
                    </Badge>
                  )}
                  {theme.borderRadius && theme.borderRadius !== '0.5rem' && (
                    <Badge variant="outline" className="text-xs">
                      {theme.borderRadius === '0' ? 'No Radius' : 
                       theme.borderRadius === '1rem' ? 'Large Radius' : 'Custom Radius'}
                    </Badge>
                  )}
                  {theme.shadows === false && (
                    <Badge variant="outline" className="text-xs">
                      No Shadows
                    </Badge>
                  )}
                  {isCustomTheme(theme.id) && (
                    <Badge variant="secondary" className="text-xs">
                      <Palette className="w-3 h-3 mr-1" />
                      Custom
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
