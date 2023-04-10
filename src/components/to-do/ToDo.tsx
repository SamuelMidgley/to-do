import { ToDo, ToDoState } from '../../app'
import './ToDo.css'

interface ToDoProps {
  item: ToDo
  setState: (id: number, state: ToDoState) => void
}

export default function ToDoItem(props: ToDoProps) {
  const { item, setState } = props
  const { id, text, state } = item

  return (
    <div className="to-do-item">
      {text}
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
