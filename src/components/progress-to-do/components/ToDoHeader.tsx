import { useShallow } from 'zustand/react/shallow'
import { useGroupStore } from '../../../store/group'

const date = new Date()

export default function ToDoHeader() {
  const activeGroupId = useGroupStore((state) => state.activeGroup)
  const groups = useGroupStore(useShallow((state) => state.groups))

  if (activeGroupId === 'My day') {
    return (
      <>
        <h1 style={{ margin: '0px' }}>
          {date.toLocaleString('default', { weekday: 'long' })},
        </h1>
        <h2 style={{ marginTop: '0px' }}>
          {date.toLocaleString('default', { day: 'numeric' })}&nbsp;
          {date.toLocaleString('default', { month: 'long' })}
        </h2>
      </>
    )
  }

  return (
    <h1 style={{ margin: '0px', marginBottom: '25px' }}>
      {groups.find((g) => g.id === activeGroupId)?.title}
    </h1>
  )
}
