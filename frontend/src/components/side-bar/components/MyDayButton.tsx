import { SunIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { GroupSettings } from '@/components/side-bar/components/GroupSettings'
import { cn } from '@/lib/utils'
import { useGroupStore } from '@/stores/group'

const myDayObj = { id: 'My day', title: 'My day', completed: false } as const

interface IMyDayButton {
  closePanel: () => void
}

export function MyDayButton({ closePanel }: IMyDayButton) {
  const activeGroup = useGroupStore((state) => state.activeGroup)
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)

  return (
    <li className="flex items-center justify-between mb-3 gap-2">
      <Button
        variant="ghost"
        className={cn(
          'flex-1 justify-start gap-2 items-center border-2',
          activeGroup === 'My day' && 'bg-accent text-accent-foreground'
        )}
        onClick={() => {
          setActiveGroup('My day')
          closePanel()
        }}
      >
        <SunIcon />
        My day
      </Button>
      <GroupSettings group={myDayObj} />
    </li>
  )
}
