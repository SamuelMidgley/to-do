import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToDoStore } from '@/stores/todo'

export function AddToDo() {
  const addToDo = useToDoStore((state) => state.addToDo)
  const [value, setValue] = useState('')

  function addNewToDo() {
    if (value.length === 0) {
      // TODO: Some user indication
      return
    }

    addToDo(value)
    setValue('')
  }

  function onKeyDownHandler(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.stopPropagation()
      e.preventDefault()
      addNewToDo()
    }
  }

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
