import { Button } from '@/components/ui/button'
import { GroupSettings } from '@/components/side-bar/components/GroupSettings'
import { IGroup } from '@/types'
import { CircleIcon, CompleteIcon } from '@/icons'
import { useGroupStore } from '@/stores/group'
import { cn } from '@/lib/utils'

interface IGroupButton {
  group: IGroup
  closePanel: () => void
}

export function GroupButton({ group, closePanel }: IGroupButton) {
  const { id, title, completed } = group
  const activeGroup = useGroupStore((state) => state.activeGroup)
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)

  return (
    <li className="flex items-center justify-between mb-3 gap-2">
      <Button
        variant="ghost"
        className={cn(
          'flex-1 justify-start items-center gap-2 border-2 border-transparent',
          activeGroup === id && 'bg-accent text-accent-foreground'
        )}
        onClick={() => {
          setActiveGroup(id)
          closePanel()
        }}
      >
        {completed ? <CompleteIcon size={15} /> : <CircleIcon size={15} />}
        {title}
      </Button>
      <GroupSettings group={group} />
    </li>
  )
}
