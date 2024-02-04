import { useQuery, keepPreviousData } from '@tanstack/react-query'

import { Progress } from '@/components/ui/progress'
import { AddToDo } from '@/components/progress-to-do/components/AddToDo'
import { CompletedToDos } from '@/components/progress-to-do/components/CompletedToDos'
import { IncompleteToDos } from '@/components/progress-to-do/components/IncompleteToDos'
import toDoService from '@/services/toDoService'
import { useGroupStore } from '@/stores/group'

export function ToDoList() {
  const activeGroup = useGroupStore((state) => state.activeGroup)

  const { data: toDos } = useQuery({
    queryKey: ['todos', activeGroup],
    queryFn: () => toDoService.getToDoList(activeGroup),
    placeholderData: keepPreviousData,
  })

  if (!toDos) {
    return null
  }

  const completedToDos = toDos.filter((td) => td.completed)
  const inCompleteToDos = toDos.filter((td) => !td.completed)

  return (
    <>
      <Progress
        title="To do progress"
        className="mb-4"
        value={(completedToDos.length / toDos.length) * 100}
      />
      <IncompleteToDos incompleteToDos={inCompleteToDos} />
      <AddToDo />
      <CompletedToDos completedToDos={completedToDos} />
    </>
  )
}
