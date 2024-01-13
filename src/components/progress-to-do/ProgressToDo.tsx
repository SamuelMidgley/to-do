import { useEffect, useLayoutEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ToDoHeader, ToDoList } from '@/components'
import { Progress } from '@/components/ui/progress'
import { IToDo, IGroup } from '@/types'
import { useToDoStore } from '@/stores/todo'
import { useGroupStore } from '@/stores/group'

export default function ProgressToDo() {
  // To do store
  const toDos = useToDoStore(useShallow((state) => state.toDos))
  const setToDos = useToDoStore((state) => state.setToDos)

  // Group store
  const activeGroupId = useGroupStore((state) => state.activeGroup)
  const setGroups = useGroupStore((state) => state.setGroups)

  useLayoutEffect(() => {
    // runs once on page load to see if there is any existing data
    const myDay = window.localStorage.getItem('My day')
    const groups = window.localStorage.getItem('todo-groups')

    if (!myDay || !groups) {
      // nothing to load
      return
    }

    const loadedToDos: IToDo[] = JSON.parse(myDay)
    const loadedGroups: IGroup[] = JSON.parse(groups)

    setToDos(loadedToDos)
    setGroups(loadedGroups)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    window.localStorage.setItem(activeGroupId, JSON.stringify(toDos))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toDos])

  const completedToDos = toDos.filter((item) => item.completed)

  return (
    <>
      <ToDoHeader />
      <Progress
        className="mb-4"
        value={(completedToDos.length / toDos.length) * 100}
      />
      <ToDoList />
    </>
  )
}
