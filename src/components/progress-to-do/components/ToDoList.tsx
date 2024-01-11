import { useShallow } from 'zustand/react/shallow'
import { useToDoStore } from '@/store/todo'
import { AddToDo, ToDoItem } from '@/components'
import { BinIcon } from '@/icons'

export default function ToDoList() {
  const toDos = useToDoStore(useShallow((state) => state.toDos))
  const clearCompleted = useToDoStore((state) => state.clearCompleted)

  const incompleteToDos = toDos.filter((item) => !item.completed)
  const completedToDos = toDos.filter((item) => item.completed)

  return (
    <>
      <h2>To do</h2>
      <ul>
        {incompleteToDos.map((item) => (
          <li key={item.id}>
            <ToDoItem item={item} />
          </li>
        ))}
      </ul>
      <AddToDo />

      {completedToDos.length > 0 && (
        <div>
          <div className="completed-header">
            <h3>Completed</h3>
            <button type="button" onClick={clearCompleted}>
              <BinIcon />
            </button>
          </div>
          <ul>
            {completedToDos.map((item) => (
              <li key={item.id}>
                <ToDoItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
