import { ToDoItem } from '@/components/progress-to-do/components/ToDoItem'
import { IToDo } from '@/types'

interface IIncompleteToDos {
  incompleteToDos: IToDo[]
}

export function IncompleteToDos({ incompleteToDos }: IIncompleteToDos) {
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
