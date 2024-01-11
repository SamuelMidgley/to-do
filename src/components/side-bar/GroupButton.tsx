import classnames from 'classnames'

export function GroupButton() {
  return (
    <button
      key={s}
      type="button"
      className={classnames('side-bar-button session-button', {
        active: activeGroup === s,
      })}
      onClick={() => setActiveGroup(s)}
    >
      {/* This needs working out */}
      {true ? <CompleteIcon size="small" /> : <CircleIcon size="small" />}
      {s}
    </button>
  )
}
