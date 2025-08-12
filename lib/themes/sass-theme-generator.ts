'use client'

import { Theme } from './theme-config'

export function generateSassTheme(theme: Theme): string {
  const { colors, fonts, borderRadius, shadows } = theme
  
  return `
// Generated theme: ${theme.name}
[data-theme="${theme.id}"] {
  // Light mode colors
  --primary: ${colors.light.primary};
  --primary-foreground: ${colors.light.primaryForeground || '0 0% 100%'};
  --secondary: ${colors.light.secondary};
  --secondary-foreground: ${colors.light.secondaryForeground || colors.light.foreground};
  --accent: ${colors.light.accent};
  --accent-foreground: ${colors.light.accentForeground || colors.light.foreground};
  --background: ${colors.light.background};
  --foreground: ${colors.light.foreground};
  --card: ${colors.light.card};
  --card-foreground: ${colors.light.cardForeground};
  --muted: ${colors.light.muted};
  --muted-foreground: ${colors.light.mutedForeground};
  --border: ${colors.light.border};
  --input: ${colors.light.input};
  --ring: ${colors.light.ring};
  --destructive: ${colors.light.destructive};
  --destructive-foreground: ${colors.light.destructiveForeground};
  --radius: ${borderRadius || '0.5rem'};
  
  ${fonts?.heading ? `
  h1, h2, h3, h4, h5, h6 {
    font-family: '${fonts.heading}', sans-serif;
  }
  ` : ''}
  
  ${fonts?.body ? `
  body {
    font-family: '${fonts.body}', sans-serif;
  }
  ` : ''}
  
  ${!shadows ? `
  .card, .btn, .form__input {
    box-shadow: none !important;
  }
  ` : ''}
  
  &.dark {
    // Dark mode colors
    --primary: ${colors.dark.primary};
    --primary-foreground: ${colors.dark.primaryForeground || colors.dark.background};
    --secondary: ${colors.dark.secondary};
    --secondary-foreground: ${colors.dark.secondaryForeground || colors.dark.foreground};
    --accent: ${colors.dark.accent};
    --accent-foreground: ${colors.dark.accentForeground || colors.dark.foreground};
    --background: ${colors.dark.background};
    --foreground: ${colors.dark.foreground};
    --card: ${colors.dark.card};
    --card-foreground: ${colors.dark.cardForeground};
    --muted: ${colors.dark.muted};
    --muted-foreground: ${colors.dark.mutedForeground};
    --border: ${colors.dark.border};
    --input: ${colors.dark.input};
    --ring: ${colors.dark.ring};
    --destructive: ${colors.dark.destructive};
    --destructive-foreground: ${colors.dark.destructiveForeground};
  }
}
`
}

export function downloadSassTheme(theme: Theme): void {
  const sassContent = generateSassTheme(theme)
  const blob = new Blob([sassContent], { type: 'text/scss' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `_${theme.id.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.scss`
  link.click()
  
  URL.revokeObjectURL(url)
}

export function generateComponentSass(componentName: string, theme: Theme): string {
  return `
// ${componentName} component with ${theme.name} theme
.${componentName.toLowerCase()} {
  @include rounded(var(--radius));
  @include transition(all);
  
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  border: 1px solid hsl(var(--border));
  
  &:hover {
    @include shadow('md');
  }
  
  &__primary {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
  
  &__secondary {
    background-color: hsl(var(--secondary));
    color: hsl(var(--secondary-foreground));
  }
}
`
}
