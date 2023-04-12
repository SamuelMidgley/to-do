import { useState } from 'preact/hooks'
import TextEditor from '../text-editor/TextEditor'

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

  return (
    <div className="to-do-item add-to-do">
      <TextEditor value={value} setValue={onChangeHandler} />
      <button className="to-do-add-button" type="button" onClick={addNewToDo}>
        +
      </button>
    </div>
  )
}
