'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Theme, defaultThemes, generateThemeCSS } from './theme-config'

interface ThemeContextType {
  currentTheme: Theme
  themes: Theme[]
  setTheme: (themeId: string) => void
  addCustomTheme: (theme: Theme) => void
  removeCustomTheme: (themeId: string) => void
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(defaultThemes[0])
  const [themes, setThemes] = useState<Theme[]>(defaultThemes)
  const [mode, setMode] = useState<'light' | 'dark'>('light')

  // Load saved theme and custom themes from localStorage
  useEffect(() => {
    const savedThemeId = localStorage.getItem('beverage-app-theme')
    const savedMode = localStorage.getItem('beverage-app-mode') as 'light' | 'dark'
    const customThemes = localStorage.getItem('beverage-app-custom-themes')

    if (customThemes) {
      try {
        const parsed = JSON.parse(customThemes)
        setThemes([...defaultThemes, ...parsed])
      } catch (error) {
        console.error('Failed to parse custom themes:', error)
      }
    }

    if (savedMode) {
      setMode(savedMode)
    }

    if (savedThemeId) {
      const theme = [...defaultThemes, ...(customThemes ? JSON.parse(customThemes) : [])].find(
        t => t.id === savedThemeId
      )
      if (theme) {
        setCurrentTheme(theme)
      }
    }
  }, [])

  // Apply theme CSS when theme or mode changes
  useEffect(() => {
    const css = generateThemeCSS(currentTheme, mode)
    
    // Remove existing theme style
    const existingStyle = document.getElementById('custom-theme-style')
    if (existingStyle) {
      existingStyle.remove()
    }

    // Add new theme style
    const style = document.createElement('style')
    style.id = 'custom-theme-style'
    style.textContent = css
    document.head.appendChild(style)

    // Update document class for dark/light mode
    document.documentElement.classList.toggle('dark', mode === 'dark')
  }, [currentTheme, mode])

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId)
    if (theme) {
      setCurrentTheme(theme)
      localStorage.setItem('beverage-app-theme', themeId)
    }
  }

  const addCustomTheme = (theme: Theme) => {
    const newThemes = [...themes, theme]
    setThemes(newThemes)
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id))
    localStorage.setItem('beverage-app-custom-themes', JSON.stringify(customThemes))
  }

  const removeCustomTheme = (themeId: string) => {
    const newThemes = themes.filter(t => t.id !== themeId)
    setThemes(newThemes)
    
    const customThemes = newThemes.filter(t => !defaultThemes.find(dt => dt.id === t.id))
    localStorage.setItem('beverage-app-custom-themes', JSON.stringify(customThemes))

    if (currentTheme.id === themeId) {
      setTheme(defaultThemes[0].id)
    }
  }

  const handleSetMode = (newMode: 'light' | 'dark') => {
    setMode(newMode)
    localStorage.setItem('beverage-app-mode', newMode)
  }

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        themes,
        setTheme,
        addCustomTheme,
        removeCustomTheme,
        mode,
        setMode: handleSetMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
