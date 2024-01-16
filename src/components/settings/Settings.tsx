import { GearIcon, CheckIcon, SunIcon, MoonIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { Color, Radius, useTheme } from '@/components/theme/ThemeProvider'
import { cn } from '@/lib/utils'

interface IColorButton {
  color: Color
  colorValue: string
  colorValueDark: string
}

function getEvalTheme(theme: 'light' | 'dark' | 'system') {
  if (theme === 'light' || theme === 'dark') {
    return theme
  }
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'

  return systemTheme
}

function ColorButton({ color, colorValue, colorValueDark }: IColorButton) {
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

interface IModeButton {
  themeTitle: 'light' | 'dark'
}

function ModeButton({ themeTitle }: IModeButton) {
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

interface IRadiusButton {
  className: Radius
  size: number
}

function RadiusButton({ className, size }: IRadiusButton) {
  const { radius, setRadius } = useTheme()

  return (
    <Button
      variant="ghost"
      className={cn('border-2', radius === className && 'border-ring')}
      onClick={() => setRadius(className)}
    >
      {size}
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
            colorValue="hsl(221.2 83.2% 53.3%)"
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
        <h2>Radius</h2>
        <div className="flex flex-wrap gap-2 ">
          <RadiusButton className="radius-0" size={0} />
          <RadiusButton className="radius-3" size={0.3} />
          <RadiusButton className="radius-5" size={0.5} />
          <RadiusButton className="radius-75" size={0.75} />
          <RadiusButton className="radius-1" size={1} />
        </div>
        <h2>Mode</h2>
        <div className="flex flex-wrap gap-2 ">
          <ModeButton themeTitle="light" />
          <ModeButton themeTitle="dark" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
