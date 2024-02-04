import { useQuery } from '@tanstack/react-query'
import { GroupButton } from '@/components/side-bar/components/GroupButton'
import { MyDayButton } from '@/components/side-bar/components/MyDayButton'
import groupService from '@/services/groupService'

interface IGroupList {
  closePanel: () => void
}

export function GroupList({ closePanel }: IGroupList) {
  const { data } = useQuery({
    queryKey: ['groups'],
    queryFn: groupService.getGroups,
  })

  return (
    <ul>
      <MyDayButton closePanel={() => closePanel()} />
      {data &&
        data.map((g) => (
          <GroupButton key={g.id} group={g} closePanel={closePanel} />
        ))}
    </ul>
  )
}
