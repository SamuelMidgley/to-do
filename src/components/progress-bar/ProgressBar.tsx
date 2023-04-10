import { ToDo } from '../../app'
import './ProgressBar.css'

interface ProgressBarProps {
  items: ToDo[]
}

export default function ProgressBar(props: ProgressBarProps) {
  const { items } = props

  const totalNum = items.length
  const completed = items.filter((item) => item.state === 'completed').length
  const onHold = items.filter((item) => item.state === 'hold').length
  const toDo = items.filter((item) => item.state === 'incomplete').length

  return (
    <div className="progress-bar-container">
      {completed > 0 && (
        <div
          className="completed-bar"
          style={{ width: `${(completed / totalNum) * 100}%` }}
        />
      )}
      {onHold > 0 && (
        <div
          className="onhold-bar"
          style={{ width: `${(onHold / totalNum) * 100}%` }}
        />
      )}
      {toDo > 0 && (
        <div
          className="todo-bar"
          style={{ width: `${(toDo / totalNum) * 100}%` }}
        />
      )}
    </div>
  )
}
