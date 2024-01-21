import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/components/theme/ThemeProvider'

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
        <>
          <SunIcon className="h-5 w-5" />
          <span className="sr-only">Turn on dark mode</span>
        </>
      ) : (
        <>
          <MoonIcon className="h-5 w-5" />
          <span className="sr-only">Turn on light mode</span>
        </>
      )}
    </Button>
  )
}
