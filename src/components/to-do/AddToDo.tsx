import { useState } from 'preact/hooks'

interface AddToDoProps {
  addItem: (text: string) => void
}

export default function AddToDo(props: AddToDoProps) {
  const { addItem } = props
  const [value, setValue] = useState('')

  function addNewToDo() {
    addItem(value)
    setValue('')
  }

  return (
    <div className="to-do-item">
      <input
        className="to-do-input"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <button className="to-do-add-button" type="button" onClick={addNewToDo}>
        +
      </button>
    </div>
  )
}
