import { useLayoutEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { ToDoHeader } from '@/components/progress-to-do/components/ToDoHeader'
import { ToDoList } from '@/components/progress-to-do/components/ToDoList'
import { Progress } from '@/components/ui/progress'
import { IToDo, IGroup } from '@/types'
import { useToDoStore } from '@/stores/todo'
import { useGroupStore } from '@/stores/group'

export function ProgressToDo() {
  // To do store
  const toDos = useToDoStore(useShallow((state) => state.toDos))
  const setToDos = useToDoStore((state) => state.setToDos)

  // Group store
  const activeGroup = useGroupStore((state) => state.activeGroup)
  const setGroups = useGroupStore((state) => state.setGroups)

  useLayoutEffect(() => {
    // runs once on page load to see if there is any existing data
    const myDay = window.localStorage.getItem('to-do-My day')
    const groups = window.localStorage.getItem('to-do-groups')

    if (myDay) {
      const loadedToDos: IToDo[] = JSON.parse(myDay)
      setToDos(loadedToDos)
    }

    if (groups) {
      const loadedGroups: IGroup[] = JSON.parse(groups)
      setGroups(loadedGroups)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    const loadedToDos = window.localStorage.getItem(`to-do-${activeGroup}`)

    if (loadedToDos) {
      const toDos: IToDo[] = JSON.parse(loadedToDos)
      setToDos(toDos)
      return
    }

    setToDos(new Array<IToDo>())
  }, [activeGroup])

  const completedToDos = toDos.filter((item) => item.completed)

  return (
    <>
      <ToDoHeader />
      <Progress
        title="To do progress"
        className="mb-4"
        value={(completedToDos.length / toDos.length) * 100}
      />
      <ToDoList />
    </>
  )
}
