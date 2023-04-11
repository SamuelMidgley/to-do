import { useState } from 'preact/hooks'
import { ToDo, ToDoState } from '../../app'
import AutoResize from '../auto-resize/AutoResize'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: ToDoState) => void
  updateText: (id: number, text: string) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState, updateText } = props
  const { id, text, state } = item

  const [value, setValue] = useState(text)

  function onBlurHandler() {
    if (text !== value) {
      updateText(id, value)
    }
  }

  function onChangeHandler(newVal: string) {
    setValue(newVal)
  }

  return (
    <div className="to-do-item">
      <AutoResize
        value={value}
        setValue={onChangeHandler}
        onBlurHandler={onBlurHandler}
      />
      <div className="to-do-actions">
        <button
          type="button"
          disabled={state === 'incomplete'}
          onClick={() => setState(id, 'incomplete')}
        >
          🔴
        </button>
        <button
          type="button"
          disabled={state === 'hold'}
          onClick={() => setState(id, 'hold')}
        >
          🟡
        </button>
        <button
          type="button"
          disabled={state === 'completed'}
          onClick={() => setState(id, 'completed')}
        >
          🟢
        </button>
      </div>
    </div>
  )
}
