import { useState } from 'preact/hooks'
import { ToDo, ToDoState } from '../../app'
import TextEditor from '../text-editor/TextEditor'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: ToDoState) => void
  updateText: (id: number, text: string) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState, updateText } = props
  const { id, text, state } = item

  const [value, setValue] = useState(text)

  function onChangeHandler(newVal: string) {
    setValue(newVal)
    if (text !== newVal) {
      updateText(id, newVal)
    }
  }

  return (
    <div className="to-do-item">
      <TextEditor value={value} setValue={onChangeHandler} />
      <div className="to-do-actions">
        <button
          type="button"
          disabled={state === 'incomplete'}
          onClick={() => setState(id, 'incomplete')}
          className="action-buttons reset-button"
        />
        <button
          type="button"
          disabled={state === 'hold'}
          onClick={() => setState(id, 'hold')}
          className="action-buttons hold-button"
        />
        <button
          type="button"
          disabled={state === 'completed'}
          onClick={() => setState(id, 'completed')}
          className="action-buttons complete-button"
        />
      </div>
    </div>
  )
}
