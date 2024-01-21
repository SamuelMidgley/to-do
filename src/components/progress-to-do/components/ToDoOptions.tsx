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
import { Focus } from '@/components/focus/Focus'
import { useState } from 'react'

interface IToDoOptions {
  toDoId: string
  isComplete: boolean
}

export function ToDoOptions({ toDoId, isComplete }: IToDoOptions) {
  const [focusOpen, setFocusOpen] = useState(false)
  const deleteToDo = useToDoStore((state) => state.deleteToDo)

  return (
    <>
      {!isComplete && (
        <Focus toDoId={toDoId} open={focusOpen} setOpen={setFocusOpen} />
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <DotsVerticalIcon className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {!isComplete && (
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={() => setFocusOpen(true)}
            >
              <CountdownTimerIcon className="h-4 w-4" />
              Focus
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => deleteToDo(toDoId)}
            className="flex gap-2 items-center focus:bg-destructive"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
