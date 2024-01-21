import { useShallow } from 'zustand/react/shallow'
import { TrashIcon } from '@radix-ui/react-icons'
import { ToDoItem } from '@/components/progress-to-do/components/ToDoItem'
import { useToDoStore } from '@/stores/todo'
import { Button } from '@/components/ui/button'

export function CompletedToDos() {
  const completedToDos = useToDoStore(
    useShallow((state) => state.toDos.filter((td) => td.completed))
  )
  const clearCompleted = useToDoStore((state) => state.clearCompleted)

  if (completedToDos.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Completed</h3>
        <Button variant="ghost" size="icon" onClick={clearCompleted}>
          <TrashIcon className="h-5 w-5" />
          <span className="sr-only">Delete completed to dos</span>
        </Button>
      </div>
      <ul className="flex flex-col gap-2 mb-20">
        {completedToDos.map((item) => (
          <li key={item.id}>
            <ToDoItem item={item} />
          </li>
        ))}
      </ul>
    </>
  )
}
