import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger, DialogContent } from '@/components/ui/dialog'
import { GearIcon } from '@radix-ui/react-icons'

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
        <div>Delete all groups</div>
        <div>Change theme colors</div>
      </DialogContent>
    </Dialog>
  )
}
