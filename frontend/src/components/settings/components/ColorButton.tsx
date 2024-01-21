import { CheckIcon } from '@radix-ui/react-icons'
import { useTheme, Color } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function getEvalTheme(theme: 'light' | 'dark' | 'system') {
  if (theme === 'light' || theme === 'dark') {
    return theme
  }
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  return systemTheme
}

interface IColorButton {
  color: Color
  colorValue: string
  colorValueDark: string
}

export function ColorButton({
  color,
  colorValue,
  colorValueDark,
}: IColorButton) {
  const { color: activeColor, theme, setColor } = useTheme()

  const evalTheme = getEvalTheme(theme)
  const colorHSL = evalTheme === 'dark' ? colorValueDark : colorValue

  const isActive = activeColor === color

  return (
    <Button
      variant="ghost"
      onClick={() => setColor(color)}
      style={{ '--theme-primary': colorHSL } as React.CSSProperties}
      className={cn('capitalize gap-2 border-2 ', isActive && 'border-ring')}
    >
      <div className="h-4 w-4 rounded-full bg-[--theme-primary]">
        {isActive && <CheckIcon className="text-primary-foreground" />}
      </div>
      {color}
    </Button>
  )
}
