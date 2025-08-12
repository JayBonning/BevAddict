export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  foreground: string
  muted: string
  mutedForeground: string
  card: string
  cardForeground: string
  border: string
  input: string
  ring: string
  destructive: string
  destructiveForeground: string
}

export interface Theme {
  id: string
  name: string
  description: string
  colors: {
    light: ThemeColors
    dark: ThemeColors
  }
  fonts?: {
    heading?: string
    body?: string
  }
  borderRadius?: string
  shadows?: boolean
}

export const defaultThemes: Theme[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and modern default theme',
    colors: {
      light: {
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
      },
      dark: {
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
      },
    },
  },
  {
    id: 'beverage-orange',
    name: 'Beverage Orange',
    description: 'Warm orange theme inspired by craft beverages',
    colors: {
      light: {
        primary: '24 100% 50%',
        secondary: '30 100% 96%',
        accent: '30 100% 96%',
        background: '0 0% 100%',
        foreground: '20 14.3% 4.1%',
        muted: '30 100% 96%',
        mutedForeground: '25 5.3% 44.7%',
        card: '0 0% 100%',
        cardForeground: '20 14.3% 4.1%',
        border: '27 96% 91%',
        input: '27 96% 91%',
        ring: '24 100% 50%',
        destructive: '0 84.2% 60.2%',
        destructiveForeground: '210 40% 98%',
      },
      dark: {
        primary: '20.5 90.2% 48.2%',
        secondary: '12 6.5% 15.1%',
        accent: '12 6.5% 15.1%',
        background: '20 14.3% 4.1%',
        foreground: '60 9.1% 97.8%',
        muted: '12 6.5% 15.1%',
        mutedForeground: '24 5.4% 63.9%',
        card: '20 14.3% 4.1%',
        cardForeground: '60 9.1% 97.8%',
        border: '12 6.5% 15.1%',
        input: '12 6.5% 15.1%',
        ring: '20.5 90.2% 48.2%',
        destructive: '0 72.2% 50.6%',
        destructiveForeground: '60 9.1% 97.8%',
      },
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    borderRadius: '0.75rem',
    shadows: true,
  },
  {
    id: 'coffee-brown',
    name: 'Coffee Brown',
    description: 'Rich brown theme perfect for coffee reviews',
    colors: {
      light: {
        primary: '25 75% 25%',
        secondary: '30 40% 95%',
        accent: '30 40% 95%',
        background: '0 0% 100%',
        foreground: '25 75% 15%',
        muted: '30 40% 95%',
        mutedForeground: '25 15% 45%',
        card: '0 0% 100%',
        cardForeground: '25 75% 15%',
        border: '30 40% 90%',
        input: '30 40% 90%',
        ring: '25 75% 25%',
        destructive: '0 84.2% 60.2%',
        destructiveForeground: '210 40% 98%',
      },
      dark: {
        primary: '30 40% 85%',
        secondary: '25 25% 20%',
        accent: '25 25% 20%',
        background: '25 75% 8%',
        foreground: '30 40% 95%',
        muted: '25 25% 20%',
        mutedForeground: '25 15% 65%',
        card: '25 75% 8%',
        cardForeground: '30 40% 95%',
        border: '25 25% 20%',
        input: '25 25% 20%',
        ring: '30 40% 85%',
        destructive: '0 62.8% 30.6%',
        destructiveForeground: '30 40% 95%',
      },
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Source Sans Pro',
    },
    borderRadius: '0.5rem',
    shadows: true,
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    description: 'Cool mint theme for refreshing beverages',
    colors: {
      light: {
        primary: '160 84% 39%',
        secondary: '160 60% 96%',
        accent: '160 60% 96%',
        background: '0 0% 100%',
        foreground: '160 84% 15%',
        muted: '160 60% 96%',
        mutedForeground: '160 15% 45%',
        card: '0 0% 100%',
        cardForeground: '160 84% 15%',
        border: '160 60% 90%',
        input: '160 60% 90%',
        ring: '160 84% 39%',
        destructive: '0 84.2% 60.2%',
        destructiveForeground: '210 40% 98%',
      },
      dark: {
        primary: '160 84% 70%',
        secondary: '160 25% 20%',
        accent: '160 25% 20%',
        background: '160 84% 8%',
        foreground: '160 60% 95%',
        muted: '160 25% 20%',
        mutedForeground: '160 15% 65%',
        card: '160 84% 8%',
        cardForeground: '160 60% 95%',
        border: '160 25% 20%',
        input: '160 25% 20%',
        ring: '160 84% 70%',
        destructive: '0 62.8% 30.6%',
        destructiveForeground: '160 60% 95%',
      },
    },
    fonts: {
      heading: 'Poppins',
      body: 'Open Sans',
    },
    borderRadius: '1rem',
    shadows: false,
  },
]

export function generateThemeCSS(theme: Theme, mode: 'light' | 'dark'): string {
  const colors = theme.colors[mode]
  
  return `
    :root {
      --primary: ${colors.primary};
      --secondary: ${colors.secondary};
      --accent: ${colors.accent};
      --background: ${colors.background};
      --foreground: ${colors.foreground};
      --muted: ${colors.muted};
      --muted-foreground: ${colors.mutedForeground};
      --card: ${colors.card};
      --card-foreground: ${colors.cardForeground};
      --border: ${colors.border};
      --input: ${colors.input};
      --ring: ${colors.ring};
      --destructive: ${colors.destructive};
      --destructive-foreground: ${colors.destructiveForeground};
      --radius: ${theme.borderRadius || '0.5rem'};
    }
    
    ${theme.fonts?.heading ? `
    h1, h2, h3, h4, h5, h6 {
      font-family: '${theme.fonts.heading}', sans-serif;
    }
    ` : ''}
    
    ${theme.fonts?.body ? `
    body {
      font-family: '${theme.fonts.body}', sans-serif;
    }
    ` : ''}
    
    ${!theme.shadows ? `
    .shadow, .shadow-sm, .shadow-md, .shadow-lg {
      box-shadow: none !important;
    }
    ` : ''}
  `
}
