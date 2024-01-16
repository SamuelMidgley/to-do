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
const RadiusSizes = [
  'radius-0',
  'radius-3',
  'radius-5',
  'radius-75',
  'radius-1',
] as const
export type Radius = (typeof RadiusSizes)[number]

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  defaultColor?: Color
  colorKey?: string
  defaultRadius?: Radius
  radiusKey?: string
}

type ThemeProviderState = {
  theme: Theme
  color: Color
  radius: Radius
  setTheme: (theme: Theme) => void
  setColor: (color: Color) => void
  setRadius: (radius: Radius) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  color: 'zinc',
  radius: 'radius-5',
  setTheme: () => null,
  setColor: () => null,
  setRadius: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  colorKey = 'to-do-color',
  defaultColor = 'zinc',
  defaultRadius = 'radius-5',
  radiusKey = 'to-do-radius',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )
  const [color, setColor] = useState<Color>(
    () => (localStorage.getItem(colorKey) as Color) || defaultColor
  )
  const [radius, setRadius] = useState<Radius>(
    () => (localStorage.getItem(radiusKey) as Radius) || defaultRadius
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

  useEffect(() => {
    const root = window.document.documentElement

    RadiusSizes.forEach((rs) => root.classList.remove(rs))

    root.classList.add(radius)
  }, [radius])

  const value = {
    theme,
    color,
    radius,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
    },
    setColor: (color: Color) => {
      localStorage.setItem(colorKey, color)
      setColor(color)
    },
    setRadius: (radius: Radius) => {
      localStorage.setItem(radiusKey, radius)
      setRadius(radius)
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
