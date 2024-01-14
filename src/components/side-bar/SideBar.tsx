import { HamburgerMenuIcon, SunIcon } from '@radix-ui/react-icons'
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
import { useGroupStore } from '@/stores/group'

export function SideBar() {
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <HamburgerMenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="h-full">
        <SheetHeader className="mb-4"></SheetHeader>
        <Button
          variant="ghost"
          className="w-full justify-start gap-2 items-center mb-2"
          onClick={() => setActiveGroup('My day')}
        >
          <SunIcon />
          My day
        </Button>

        <GroupList />

        <NewGroup />

        <Separator className="my-4" />
        <SheetFooter className="flex mt-auto">
          <Settings />
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
