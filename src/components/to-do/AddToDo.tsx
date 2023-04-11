import { useState } from 'preact/hooks'
import AutoResize from '../auto-resize/AutoResize'

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

  function onChangeHandler(newVal: string) {
    setValue(newVal)
  }

  function onBlurHandler() {}

  return (
    <div className="to-do-item add-to-do">
      <AutoResize
        value={value}
        setValue={onChangeHandler}
        onBlurHandler={onBlurHandler}
      />
      <button className="to-do-add-button" type="button" onClick={addNewToDo}>
        +
      </button>
    </div>
  )
}
