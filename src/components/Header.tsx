import { DarkModeToggle } from './DarkModeToggle'
import { SideBar } from './SideBar'

export function Header() {
  return (
    <div className="flex w-full justify-between py-4 px-6">
      <SideBar />
      <DarkModeToggle />
    </div>
  )
}
