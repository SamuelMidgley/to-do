import { ToDo } from '../../app'
import Check from '../check/Check'
import TextEditor from '../text-editor/TextEditor'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: boolean) => void
  updateText: (id: number, text: string) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState, updateText } = props
  const { id, title, completed } = item

  function onChangeHandler(newVal: string) {
    if (title !== newVal) {
      updateText(id, newVal)
    }
  }

  return (
    <div className="to-do-item">
      <Check checked={completed} setChecked={() => setState(id, !completed)} />
      <TextEditor value={title} setValue={onChangeHandler} />
    </div>
  )
}
