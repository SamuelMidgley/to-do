import { GroupButton } from '@/components/side-bar/GroupButton'
import { useGroupStore } from '@/stores/group'

export function GroupList() {
  const groups = useGroupStore((state) => state.groups)

  return (
    <ul>
      {groups.map((g) => (
        <GroupButton key={g.id} group={g} />
      ))}
    </ul>
  )
}
