import { ToDo, ToDoState } from '../../app'
import Check from '../check/Check'
import TextEditor from '../text-editor/TextEditor'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: ToDoState) => void
  updateText: (id: number, text: string) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState, updateText } = props
  const { id, text, state } = item

  function onChangeHandler(newVal: string) {
    if (text !== newVal) {
      updateText(id, newVal)
    }
  }

  function changeStateHandler() {
    const newState: ToDoState =
      state === 'completed' ? 'incomplete' : 'completed'

    setState(id, newState)
  }

  return (
    <div className="to-do-item">
      <Check checked={state === 'completed'} setChecked={changeStateHandler} />
      <TextEditor value={text} setValue={onChangeHandler} />
    </div>
  )
}
