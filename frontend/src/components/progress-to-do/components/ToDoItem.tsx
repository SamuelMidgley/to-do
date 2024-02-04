import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Card } from '@/components/ui/card'
import { Check } from '@/components/progress-to-do/components/Check'
import { ToDoOptions } from '@/components/progress-to-do/components/ToDoOptions'
import { IToDo } from '@/types'
import toDoService from '@/services/toDoService'

interface ToDoProps {
  item: IToDo
}

// Do something with this
interface IUpdateState {
  id: number
  completed: boolean
}

interface IUpdateTitle {
  id: number
  title: string
}

export function ToDoItem({ item }: ToDoProps) {
  const { id, title, completed } = item
  const queryClient = useQueryClient()

  function onChangeHandler(newVal: string) {
    if (title !== newVal) {
      // Needs a debounce
      toDoTitle.mutate({
        id,
        title: newVal,
      })
    }
  }

  const toDoTitle = useMutation({
    mutationFn: ({ id, title }: IUpdateTitle) =>
      toDoService.updateToDoTitle(id, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  const toDoState = useMutation({
    mutationFn: ({ id, completed }: IUpdateState) =>
      toDoService.updateToDoState(id, completed),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <Card className="flex gap-2 p-2">
      <Check
        checked={completed}
        setChecked={() =>
          toDoState.mutate({
            id,
            completed: !completed,
          })
        }
      />
      <input
        className="flex-grow focus:outline-none bg-card"
        value={title}
        onInput={(e) => onChangeHandler(e.currentTarget.value)}
      />
      <ToDoOptions toDoId={id} isComplete={completed} />
    </Card>
  )
}
