import { useState } from 'react'

export default function AddToDo() {
  const [value, setValue] = useState('')

  function addNewToDo() {
    addItem(value)
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
    <div className="to-do-item add-to-do">
      <input
        className="input"
        value={value}
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
        onKeyDown={onKeyDownHandler}
      />
      <button className="to-do-add-button" type="button" onClick={addNewToDo}>
        +
      </button>
    </div>
  )
}
