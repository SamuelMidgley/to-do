interface ProgressBarProps {
  completed: number
  totalNum: number
}

export default function ProgressBar(props: ProgressBarProps) {
  const { completed, totalNum } = props

  let completedPercentage
  let inCompletePercentage = 100
  if (completed > 0) {
    completedPercentage = (completed / totalNum) * 100
    inCompletePercentage -= completedPercentage
  }

  return (
    <div className="progress-bar-container">
      {completed > 0 && (
        <div
          className="completed-bar"
          style={{ width: `${completedPercentage}%` }}
        />
      )}
      <div className="todo-bar" style={{ width: `${inCompletePercentage}%` }} />
    </div>
  )
}
