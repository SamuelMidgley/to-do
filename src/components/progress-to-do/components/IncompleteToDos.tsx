import { useShallow } from 'zustand/react/shallow'
import { ToDoItem } from '@/components/progress-to-do/components/ToDoItem'
import { useToDoStore } from '@/stores/todo'

export default function IncompleteToDos() {
  const incompleteToDos = useToDoStore(
    useShallow((state) => state.toDos.filter((td) => !td.completed))
  )

  return (
    <ul className="flex flex-col gap-2">
      {incompleteToDos.map((item) => (
        <li key={item.id}>
          <ToDoItem item={item} />
        </li>
      ))}
    </ul>
  )
}
