import { Button } from '@/components/ui/button'
import { GroupSettings } from '@/components/side-bar/GroupSettings'
import { IGroup } from '@/types'
import { CircleIcon, CompleteIcon } from '@/icons'
import { useGroupStore } from '@/stores/group'

interface IGroupButton {
  group: IGroup
}

export function GroupButton({ group }: IGroupButton) {
  const { id, title, completed } = group
  const setActiveGroup = useGroupStore((state) => state.setActiveGroup)

  return (
    <li className="flex items-center justify-between mb-3">
      <Button
        variant="ghost"
        className="flex-1 justify-start items-center gap-2"
        onClick={() => setActiveGroup(id)}
      >
        {completed ? <CompleteIcon size={15} /> : <CircleIcon size={15} />}
        {title}
      </Button>
      <GroupSettings group={group} />
    </li>
  )
}
