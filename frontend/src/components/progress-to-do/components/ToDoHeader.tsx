import { useGroupStore } from '@/stores/group'
import groupService from '@/services/groupService'
import { useQuery } from '@tanstack/react-query'

const date = new Date()

export function ToDoHeader() {
  const activeGroupId = useGroupStore((state) => state.activeGroup)

  const { isSuccess, data } = useQuery({
    queryKey: [activeGroupId],
    queryFn: () => groupService.getGroupById(activeGroupId),
  })

  if (activeGroupId === 'My day') {
    return (
      <>
        <h1 className="mt-8 mb-2 text-4xl font-bold">
          {date.toLocaleString('default', { weekday: 'long' })},
        </h1>
        <h2 className="mb-4 text-2xl font-semibold">
          {date.toLocaleString('default', { day: 'numeric' })}&nbsp;
          {date.toLocaleString('default', { month: 'long' })}
        </h2>
      </>
    )
  }

  if (!isSuccess || !data) {
    return null
  }

  return <h1 className="mt-8 mb-6 text-4xl font-bold">{data.title}</h1>
}
