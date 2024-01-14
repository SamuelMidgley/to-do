import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light' | 'system'
export const ColorTypes = [
  'zinc',
  'red',
  'blue',
  'green',
  'rose',
  'yellow',
  'violet',
] as const
export type Color = (typeof ColorTypes)[number]

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultColor?: Color
  colorKey?: string
}

type ThemeProviderState = {
  theme: Theme
  color: Color
  setTheme: (theme: Theme) => void
  setColor: (color: Color) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  color: 'zinc',
  setTheme: () => null,
  setColor: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  colorKey = 'to-do-color',
  defaultColor = 'zinc',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [color, setColor] = useState<Color>(
    () => (localStorage.getItem(colorKey) as Color) || defaultColor
  )

  useEffect(() => {
    const root = window.document.documentElement

    root.classList.remove('light', 'dark')

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'

      root.classList.add(systemTheme)
      return
    }

    root.classList.add(theme)
  }, [theme])

  useEffect(() => {
    const root = window.document.documentElement

    ColorTypes.forEach((ct) => root.classList.remove(ct))

    root.classList.add(color)
  }, [color])

  const value = {
    theme,
    color,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    setColor: (color: Color) => {
      localStorage.setItem(colorKey, color)
      setColor(color)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider')

  return context
}
