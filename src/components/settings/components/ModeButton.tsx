import { SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { useTheme } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IModeButton {
  themeTitle: 'light' | 'dark'
}

export function ModeButton({ themeTitle }: IModeButton) {
  const { theme, setTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      className={cn('gap-2 border-2', theme === themeTitle && 'border-ring')}
      onClick={() => setTheme(themeTitle)}
    >
      {themeTitle === 'light' ? <SunIcon /> : <MoonIcon />}
      <p className="capitalize">{themeTitle}</p>
    </Button>
  )
}
