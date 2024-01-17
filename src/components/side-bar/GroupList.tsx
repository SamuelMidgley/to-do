import { GroupButton } from '@/components/side-bar/GroupButton'
import { useGroupStore } from '@/stores/group'

interface IGroupList {
  closePanel: () => void
}

export function GroupList({ closePanel }: IGroupList) {
  const groups = useGroupStore((state) => state.groups)

  return (
    <ul>
      {groups
        .filter((g) => g.id !== 'My day')
        .map((g) => (
          <GroupButton key={g.id} group={g} closePanel={closePanel} />
        ))}
    </ul>
  )
}
