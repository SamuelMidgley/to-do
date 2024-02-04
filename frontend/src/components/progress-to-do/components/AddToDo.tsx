import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CreateToDoRequest } from '@/types'
import toDoService from '@/services/toDoService'
import { useGroupStore } from '@/stores/group'

// Should add group to this

export function AddToDo() {
  const groupId = useGroupStore((state) => state.activeGroup)
  const queryClient = useQueryClient()
  const [value, setValue] = useState('')

  function addNewToDo() {
    if (value.length === 0) {
      // TODO: Some user indication
      return
    }

    mutation.mutate({
      title: value,
      myDay: groupId === 'My day',
    })
    setValue('')
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.stopPropagation()
      e.preventDefault()
      addNewToDo()
    }
  }

  const mutation = useMutation({
    mutationFn: (newToDo: CreateToDoRequest) => toDoService.addToDo(newToDo),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  return (
    <Card className="flex p-2 mt-2 mb-4">
      <input
        className="flex-grow focus:outline-none bg-card"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
        onKeyDown={onKeyDownHandler}
      />
      <Button variant="ghost" size="icon" onClick={addNewToDo}>
        <PlusIcon className="h-4 w-4" />
        <span className="sr-only">Add to do</span>
      </Button>
    </Card>
  )
}
