import { Card } from '@/components/ui/card'
import { Check } from '@/components/progress-to-do/components/Check'
import { ToDoOptions } from '@/components/progress-to-do/components/ToDoOptions'
import { IToDo } from '@/types'
import { useToDoStore } from '@/stores/todo'

interface ToDoProps {
  item: IToDo
}

export function ToDoItem({ item }: ToDoProps) {
  const { id, title, completed } = item
  const updateToDo = useToDoStore((state) => state.updateToDo)
  const setToDoState = useToDoStore((state) => state.setToDoState)

  function onChangeHandler(newVal: string) {
    if (title !== newVal) {
      updateToDo(id, newVal)
    }
  }

  return (
    <Card className="flex gap-2 p-2">
      <Check
        checked={completed}
        setChecked={() => setToDoState(id, !completed)}
      />
      <input
        className="flex-grow focus:outline-none bg-card"
        value={title}
        onInput={(e) => onChangeHandler(e.currentTarget.value)}
      />
      <ToDoOptions toDoId={id} />
    </Card>
  )
}
