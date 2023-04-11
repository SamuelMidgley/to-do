import { ToDo } from '../../app'

interface ProgressBarProps {
  completed: number
  onHold: number
  toDo: number
  totalNum: number
}

export default function ProgressBar(props: ProgressBarProps) {
  const { completed, onHold, toDo, totalNum } = props

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
