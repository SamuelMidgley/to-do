import {
  CountdownTimerIcon,
  DotsVerticalIcon,
  TrashIcon,
} from '@radix-ui/react-icons'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { useToDoStore } from '@/stores/todo'

interface IToDoOptions {
  toDoId: string
}

export function ToDoOptions({ toDoId }: IToDoOptions) {
  const deleteToDo = useToDoStore((state) => state.deleteToDo)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <DotsVerticalIcon className="h-4 w-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex gap-2 items-center">
          <CountdownTimerIcon className="h-4 w-4" />
          Focus
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteToDo(toDoId)}
          className="flex gap-2 items-center focus:bg-destructive"
        >
          <TrashIcon className="h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
