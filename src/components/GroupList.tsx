import { useGroupStore } from '@/stores/group'
import { GroupButton } from './GroupButton'

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
