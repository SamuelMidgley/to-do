import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
import { Focus } from '@/components/focus/Focus'
import toDoService from '@/services/toDoService'

interface IToDoOptions {
  toDoId: number
  isComplete: boolean
}

export function ToDoOptions({ toDoId, isComplete }: IToDoOptions) {
  const queryClient = useQueryClient()
  const [focusOpen, setFocusOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: (id: number) => toDoService.deleteToDo(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

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
            onClick={() => {
              mutation.mutate(toDoId)
            }}
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
