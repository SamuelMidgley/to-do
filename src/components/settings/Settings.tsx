import { GearIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { ColorButton } from '@/components/settings/ColorButton'
import { ModeButton } from '@/components/settings/ModeButton'
import { RadiusButton } from '@/components/settings/RadiusButton'
import { Color } from '@/components/theme/ThemeProvider'
import colors from '@/components/settings/colors.json'

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
        <h1 className="text-lg font-semibold">Settings</h1>
        <h2 className="font-semibold">Color</h2>
        <div className="flex flex-wrap gap-2">
          {colors.colors.map((c) => (
            <ColorButton
              color={c.color as Color}
              colorValue={c.hsl}
              colorValueDark={c.hslDark}
            />
          ))}
        </div>
        <h2 className="font-semibold">Radius</h2>
        <div className="flex flex-wrap gap-2 ">
          <RadiusButton className="radius-0" size={0} />
          <RadiusButton className="radius-3" size={0.3} />
          <RadiusButton className="radius-5" size={0.5} />
          <RadiusButton className="radius-75" size={0.75} />
          <RadiusButton className="radius-1" size={1} />
        </div>
        <h2 className="font-semibold">Mode</h2>
        <div className="flex flex-wrap gap-2 ">
          <ModeButton themeTitle="light" />
          <ModeButton themeTitle="dark" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
