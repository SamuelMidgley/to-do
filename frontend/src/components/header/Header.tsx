import { DarkModeToggle } from '@/components/header/components/DarkModeToggle'
import { SideBar } from '@/components/side-bar/SideBar'

export function Header() {
  return (
    <div className="flex w-full justify-between py-4 px-6">
      <SideBar />
      <DarkModeToggle />
    </div>
  )
}
