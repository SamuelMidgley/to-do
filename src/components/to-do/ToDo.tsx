import { IToDo } from '../../types'
import { Check } from '..'
import './ToDo.css'

interface ToDoProps {
  item: IToDo
}

export default function ToDoItem({ item }: ToDoProps) {
  const { id, title, completed } = item

  function onChangeHandler(newVal: string) {
    if (title !== newVal) {
      updateText(id, newVal)
    }
  }

  return (
    <div className="to-do-item">
      <Check checked={completed} setChecked={() => setState(id, !completed)} />
      <input
        className="input"
        value={title}
        onInput={(e) => onChangeHandler(e.currentTarget.value)}
      />
    </div>
  )
}
