import { ToDoItem } from '@/components/progress-to-do/components/ToDoItem'
import { IToDo } from '@/types'

interface ICompletedToDos {
  completedToDos: IToDo[]
}

export function CompletedToDos({ completedToDos }: ICompletedToDos) {
  if (completedToDos.length === 0) {
    return null
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Completed</h3>
        {/* <Button
          variant="ghost"
          size="icon"
          onClick={() => mutation.mutate(groupId)}
        >
          <TrashIcon className="h-5 w-5" />
          <span className="sr-only">Delete completed to dos</span>
        </Button> */}
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
