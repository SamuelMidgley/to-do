import { useLayoutEffect, useState } from 'react'
import { GearIcon, CheckIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Color, useTheme } from '@/components/theme/ThemeProvider'
import { cn } from '@/lib/utils'

interface IColorButton {
  color: Color
  colorValue: string
  colorValueDark: string
}

function ColorButton({ color, colorValue, colorValueDark }: IColorButton) {
  const { color: activeColor, theme, setColor } = useTheme()
  const [evalTheme, setEvalTheme] = useState<'light' | 'dark'>('dark')

  useLayoutEffect(() => {
    const root = window.document.documentElement

    const isDark = root.classList.contains('dark')
    setEvalTheme(isDark ? 'dark' : 'light')
  }, [theme])

  const colorHSL = evalTheme === 'dark' ? colorValueDark : colorValue
  const isActive = activeColor === color

  return (
    <Button
      variant="ghost"
      onClick={() => setColor(color)}
      style={{ '--theme-primary': colorHSL } as React.CSSProperties}
      className={cn('capitalize gap-2', isActive && 'border-2 border-primary')}
    >
      <div className="h-4 w-4 rounded-full bg-[--theme-primary]">
        {isActive && <CheckIcon className="text-primary-foreground" />}
      </div>
      {color}
    </Button>
  )
}

export function Settings() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex gap-2 items-center flex-1 justify-start"
        >
          <GearIcon />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h1>Settings</h1>
        <h2>Color</h2>
        <div className="flex flex-wrap gap-2">
          <ColorButton
            color="zinc"
            colorValue="hsl(240 5.9% 10%)"
            colorValueDark="hsl(0 0% 98%)"
          />
          <ColorButton
            color="red"
            colorValue="hsl(0 72.2% 50.6%)"
            colorValueDark="hsl(0 72.2% 50.6%)"
          />
          <ColorButton
            color="blue"
            colorValue="hsl(0 72.2% 50.6%)"
            colorValueDark="hsl(217.2 91.2% 59.8%)"
          />
          <ColorButton
            color="green"
            colorValue="hsl(142.1 76.2% 36.3%)"
            colorValueDark="hsl(142.1 70.6% 45.3%)"
          />
          <ColorButton
            color="rose"
            colorValue="hsl(346.8 77.2% 49.8%)"
            colorValueDark="hsl(346.8 77.2% 49.8%)"
          />
          <ColorButton
            color="yellow"
            colorValue="hsl(47.9 95.8% 53.1%)"
            colorValueDark="hsl(47.9 95.8% 53.1%)"
          />
          <ColorButton
            color="violet"
            colorValue="hsl(262.1 83.3% 57.8%)"
            colorValueDark="hsl(263.4 70% 50.4%)"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
