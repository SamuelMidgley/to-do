import { useState } from 'react'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Settings } from '@/components/settings/Settings'
import { GroupList } from '@/components/side-bar/GroupList'
import { NewGroup } from '@/components/side-bar/NewGroup'

export function SideBar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full">
        <SheetHeader className="mb-4"></SheetHeader>

        <GroupList closePanel={() => setOpen(false)} />
        <NewGroup closePanel={() => setOpen(false)} />

        <Separator className="my-4" />
        <SheetFooter className="flex mt-auto">
          <Settings />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
