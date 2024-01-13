import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from './ui/button'
import { useTheme } from './ThemeProvider'

export function DarkModeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => {
        if (theme === 'dark') {
          setTheme('light')
          return
        }
        setTheme('dark')
      }}
    >
      {theme === 'light' ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </Button>
  )
}
