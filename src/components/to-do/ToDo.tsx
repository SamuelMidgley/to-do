import { useEffect, useRef, useState } from 'preact/hooks'
import { ToDo, ToDoState } from '../../app'
import { JSXInternal } from 'preact/src/jsx'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: ToDoState) => void
  updateText: (id: number, text: string) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState, updateText } = props
  const { id, text, state } = item
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const [value, setValue] = useState(text)

  function onBlurHandler() {
    if (text !== value) {
      updateText(id, value)
    }
  }

  useEffect(() => {
    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }, [textAreaRef.current])

  function onChangeHandler(e: JSXInternal.TargetedEvent<HTMLTextAreaElement>) {
    setValue((e.target as HTMLTextAreaElement).value.trimEnd())

    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }

  function onKeyDownHandler(
    e: JSXInternal.TargetedKeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (textAreaRef.current) {
        textAreaRef.current.blur()
      }
    }

    if (textAreaRef.current) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      textAreaRef.current.style.height = '0px'
      const scrollHeight = textAreaRef.current.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      textAreaRef.current.style.height = scrollHeight + 'px'
    }
  }

  return (
    <div className="to-do-item">
      <textarea
        className="to-do-input"
        ref={textAreaRef}
        value={value}
        onChange={(e) => onChangeHandler(e)}
        onKeyDown={(e) => onKeyDownHandler(e)}
        rows={1}
        onBlur={onBlurHandler}
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
