'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useTheme } from '@/lib/themes/theme-context'
import { Theme, ThemeColors } from '@/lib/themes/theme-config'
import { Palette, Save, Eye, Download, Upload } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const fontOptions = [
  'Inter',
  'Roboto',
  'Open Sans',
  'Poppins',
  'Playfair Display',
  'Source Sans Pro',
  'Lato',
  'Montserrat',
]

const borderRadiusOptions = [
  { label: 'None', value: '0' },
  { label: 'Small', value: '0.25rem' },
  { label: 'Medium', value: '0.5rem' },
  { label: 'Large', value: '0.75rem' },
  { label: 'Extra Large', value: '1rem' },
]

export default function ThemeBuilder() {
  const { addCustomTheme, setTheme, currentTheme } = useTheme()
  const { toast } = useToast()
  
  const [themeName, setThemeName] = useState('')
  const [themeDescription, setThemeDescription] = useState('')
  const [headingFont, setHeadingFont] = useState('Inter')
  const [bodyFont, setBodyFont] = useState('Inter')
  const [borderRadius, setBorderRadius] = useState('0.5rem')
  const [shadows, setShadows] = useState(true)
  const [previewMode, setPreviewMode] = useState<'light' | 'dark'>('light')
  
  const [lightColors, setLightColors] = useState<ThemeColors>({
    primary: '222.2 84% 4.9%',
    secondary: '210 40% 96%',
    accent: '210 40% 96%',
    background: '0 0% 100%',
    foreground: '222.2 84% 4.9%',
    muted: '210 40% 96%',
    mutedForeground: '215.4 16.3% 46.9%',
    card: '0 0% 100%',
    cardForeground: '222.2 84% 4.9%',
    border: '214.3 31.8% 91.4%',
    input: '214.3 31.8% 91.4%',
    ring: '222.2 84% 4.9%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '210 40% 98%',
  })
  
  const [darkColors, setDarkColors] = useState<ThemeColors>({
    primary: '210 40% 98%',
    secondary: '217.2 32.6% 17.5%',
    accent: '217.2 32.6% 17.5%',
    background: '222.2 84% 4.9%',
    foreground: '210 40% 98%',
    muted: '217.2 32.6% 17.5%',
    mutedForeground: '215 20.2% 65.1%',
    card: '222.2 84% 4.9%',
    cardForeground: '210 40% 98%',
    border: '217.2 32.6% 17.5%',
    input: '217.2 32.6% 17.5%',
    ring: '212.7 26.8% 83.9%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '210 40% 98%',
  })

  const updateLightColor = (key: keyof ThemeColors, value: string) => {
    setLightColors(prev => ({ ...prev, [key]: value }))
  }

  const updateDarkColor = (key: keyof ThemeColors, value: string) => {
    setDarkColors(prev => ({ ...prev, [key]: value }))
  }

  const generateRandomTheme = () => {
    const hue = Math.floor(Math.random() * 360)
    const saturation = Math.floor(Math.random() * 50) + 50
    const lightness = Math.floor(Math.random() * 30) + 35

    const primary = `${hue} ${saturation}% ${lightness}%`
    const secondary = `${(hue + 30) % 360} ${saturation - 20}% 96%`
    
    setLightColors(prev => ({
      ...prev,
      primary,
      secondary,
      ring: primary,
    }))

    setDarkColors(prev => ({
      ...prev,
      primary: `${hue} ${saturation}% ${lightness + 30}%`,
      ring: `${hue} ${saturation}% ${lightness + 30}%`,
    }))
  }

  const saveTheme = () => {
    if (!themeName.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a theme name',
        variant: 'destructive',
      })
      return
    }

    const newTheme: Theme = {
      id: `custom-${Date.now()}`,
      name: themeName,
      description: themeDescription || 'Custom theme',
      colors: {
        light: lightColors,
        dark: darkColors,
      },
      fonts: {
        heading: headingFont,
        body: bodyFont,
      },
      borderRadius,
      shadows,
    }

    addCustomTheme(newTheme)
    setTheme(newTheme.id)
    
    toast({
      title: 'Success',
      description: 'Theme saved and applied!',
    })

    // Reset form
    setThemeName('')
    setThemeDescription('')
  }

  const exportTheme = () => {
    const theme: Theme = {
      id: `exported-${Date.now()}`,
      name: themeName || 'Exported Theme',
      description: themeDescription || 'Exported custom theme',
      colors: {
        light: lightColors,
        dark: darkColors,
      },
      fonts: {
        heading: headingFont,
        body: bodyFont,
      },
      borderRadius,
      shadows,
    }

    const dataStr = JSON.stringify(theme, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`
    link.click()
    
    URL.revokeObjectURL(url)
  }

  const importTheme = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const theme = JSON.parse(e.target?.result as string) as Theme
        
        setThemeName(theme.name)
        setThemeDescription(theme.description)
        setLightColors(theme.colors.light)
        setDarkColors(theme.colors.dark)
        setHeadingFont(theme.fonts?.heading || 'Inter')
        setBodyFont(theme.fonts?.body || 'Inter')
        setBorderRadius(theme.borderRadius || '0.5rem')
        setShadows(theme.shadows !== false)
        
        toast({
          title: 'Success',
          description: 'Theme imported successfully!',
        })
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to import theme file',
          variant: 'destructive',
        })
      }
    }
    reader.readAsText(file)
  }

  const ColorInput = ({ 
    label, 
    value, 
    onChange, 
    description 
  }: { 
    label: string
    value: string
    onChange: (value: string) => void
    description?: string
  }) => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="hue saturation% lightness%"
        className="font-mono text-sm"
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Palette className="w-6 h-6" />
            Theme Builder
          </h2>
          <p className="text-muted-foreground">Create and customize your own themes</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={generateRandomTheme}>
            <Palette className="w-4 h-4 mr-2" />
            Random Colors
          </Button>
          <Button variant="outline" onClick={exportTheme}>
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={importTheme}
              className="hidden"
              id="import-theme"
            />
            <Button variant="outline" asChild>
              <label htmlFor="import-theme" className="cursor-pointer">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </label>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Information</CardTitle>
              <CardDescription>Basic information about your theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme-name">Theme Name</Label>
                <Input
                  id="theme-name"
                  value={themeName}
                  onChange={(e) => setThemeName(e.target.value)}
                  placeholder="My Awesome Theme"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="theme-description">Description</Label>
                <Textarea
                  id="theme-description"
                  value={themeDescription}
                  onChange={(e) => setThemeDescription(e.target.value)}
                  placeholder="A beautiful theme for beverage reviews..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Typography & Layout</CardTitle>
              <CardDescription>Customize fonts and layout options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Heading Font</Label>
                  <Select value={headingFont} onValueChange={setHeadingFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Body Font</Label>
                  <Select value={bodyFont} onValueChange={setBodyFont}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fontOptions.map(font => (
                        <SelectItem key={font} value={font}>{font}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Select value={borderRadius} onValueChange={setBorderRadius}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {borderRadiusOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="shadows"
                  checked={shadows}
                  onCheckedChange={setShadows}
                />
                <Label htmlFor="shadows">Enable Shadows</Label>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="light" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="light">Light Mode</TabsTrigger>
              <TabsTrigger value="dark">Dark Mode</TabsTrigger>
            </TabsList>
            
            <TabsContent value="light" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Light Mode Colors</CardTitle>
                  <CardDescription>
                    Use HSL format: hue saturation% lightness%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ColorInput
                      label="Primary"
                      value={lightColors.primary}
                      onChange={(value) => updateLightColor('primary', value)}
                      description="Main brand color"
                    />
                    <ColorInput
                      label="Secondary"
                      value={lightColors.secondary}
                      onChange={(value) => updateLightColor('secondary', value)}
                      description="Secondary elements"
                    />
                    <ColorInput
                      label="Background"
                      value={lightColors.background}
                      onChange={(value) => updateLightColor('background', value)}
                      description="Page background"
                    />
                    <ColorInput
                      label="Foreground"
                      value={lightColors.foreground}
                      onChange={(value) => updateLightColor('foreground', value)}
                      description="Text color"
                    />
                    <ColorInput
                      label="Card"
                      value={lightColors.card}
                      onChange={(value) => updateLightColor('card', value)}
                      description="Card backgrounds"
                    />
                    <ColorInput
                      label="Border"
                      value={lightColors.border}
                      onChange={(value) => updateLightColor('border', value)}
                      description="Border color"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="dark" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Dark Mode Colors</CardTitle>
                  <CardDescription>
                    Use HSL format: hue saturation% lightness%
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <ColorInput
                      label="Primary"
                      value={darkColors.primary}
                      onChange={(value) => updateDarkColor('primary', value)}
                      description="Main brand color"
                    />
                    <ColorInput
                      label="Secondary"
                      value={darkColors.secondary}
                      onChange={(value) => updateDarkColor('secondary', value)}
                      description="Secondary elements"
                    />
                    <ColorInput
                      label="Background"
                      value={darkColors.background}
                      onChange={(value) => updateDarkColor('background', value)}
                      description="Page background"
                    />
                    <ColorInput
                      label="Foreground"
                      value={darkColors.foreground}
                      onChange={(value) => updateDarkColor('foreground', value)}
                      description="Text color"
                    />
                    <ColorInput
                      label="Card"
                      value={darkColors.card}
                      onChange={(value) => updateDarkColor('card', value)}
                      description="Card backgrounds"
                    />
                    <ColorInput
                      label="Border"
                      value={darkColors.border}
                      onChange={(value) => updateDarkColor('border', value)}
                      description="Border color"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex gap-2">
            <Button onClick={saveTheme} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Save & Apply Theme
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Live Preview
              </CardTitle>
              <div className="flex gap-2">
                <Button
                  variant={previewMode === 'light' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('light')}
                >
                  Light
                </Button>
                <Button
                  variant={previewMode === 'dark' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPreviewMode('dark')}
                >
                  Dark
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className={`p-4 rounded-lg border ${previewMode === 'dark' ? 'dark' : ''}`}
                style={{
                  backgroundColor: `hsl(${previewMode === 'light' ? lightColors.background : darkColors.background})`,
                  color: `hsl(${previewMode === 'light' ? lightColors.foreground : darkColors.foreground})`,
                  borderColor: `hsl(${previewMode === 'light' ? lightColors.border : darkColors.border})`,
                }}
              >
                <div className="space-y-4">
                  <div>
                    <h3 
                      className="text-lg font-semibold"
                      style={{ 
                        fontFamily: headingFont,
                        color: `hsl(${previewMode === 'light' ? lightColors.primary : darkColors.primary})` 
                      }}
                    >
                      Sample Beverage Review
                    </h3>
                    <p 
                      className="text-sm"
                      style={{ 
                        fontFamily: bodyFont,
                        color: `hsl(${previewMode === 'light' ? lightColors.mutedForeground : darkColors.mutedForeground})` 
                      }}
                    >
                      by John Doe • 2 hours ago
                    </p>
                  </div>
                  
                  <div 
                    className="p-3 rounded"
                    style={{
                      backgroundColor: `hsl(${previewMode === 'light' ? lightColors.card : darkColors.card})`,
                      borderRadius: borderRadius,
                      boxShadow: shadows ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    <h4 
                      className="font-medium"
                      style={{ 
                        fontFamily: headingFont,
                        color: `hsl(${previewMode === 'light' ? lightColors.cardForeground : darkColors.cardForeground})` 
                      }}
                    >
                      Craft Cola Supreme
                    </h4>
                    <p 
                      className="text-sm mt-1"
                      style={{ 
                        fontFamily: bodyFont,
                        color: `hsl(${previewMode === 'light' ? lightColors.mutedForeground : darkColors.mutedForeground})` 
                      }}
                    >
                      A refreshing take on classic cola with natural ingredients.
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <Badge 
                        style={{
                          backgroundColor: `hsl(${previewMode === 'light' ? lightColors.primary : darkColors.primary})`,
                          color: `hsl(${previewMode === 'light' ? lightColors.background : darkColors.background})`,
                        }}
                      >
                        8.5/10
                      </Badge>
                      <span 
                        className="text-xs"
                        style={{ 
                          color: `hsl(${previewMode === 'light' ? lightColors.mutedForeground : darkColors.mutedForeground})` 
                        }}
                      >
                        Excellent
                      </span>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    style={{
                      backgroundColor: `hsl(${previewMode === 'light' ? lightColors.primary : darkColors.primary})`,
                      color: `hsl(${previewMode === 'light' ? lightColors.background : darkColors.background})`,
                      borderRadius: borderRadius,
                      boxShadow: shadows ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
