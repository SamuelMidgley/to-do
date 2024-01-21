import { useShallow } from 'zustand/react/shallow'
import { useGroupStore } from '@/stores/group'

const date = new Date()

export function ToDoHeader() {
  const activeGroupId = useGroupStore((state) => state.activeGroup)
  const groups = useGroupStore(useShallow((state) => state.groups))

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

  return (
    <h1 className="mt-8 mb-6 text-4xl font-bold">
      {groups.find((g) => g.id === activeGroupId)?.title}
    </h1>
  )
}
