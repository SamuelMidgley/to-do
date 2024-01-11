import { useRef, useState } from 'react'
import {
  CircleIcon,
  CompleteIcon,
  DayIcon,
  PlusIcon,
  SettingsIcon,
} from '../../icons'
import { AddGroup } from './AddGroup'
import './SideBar.css'

import classnames from 'classnames'

export default function SideBar() {
  const [creatingGroup, setCreatingGroup] = useState(false)
  const ref = useRef<HTMLDialogElement>(null)

  function handleActiveGroupChange(newGroupId: string) {
    setActiveGroup(newGroupId)

    // On page load
    // Check if we have any data saved
    const savedData = window.localStorage.getItem(newGroupId)

    if (!savedData) {
      setToDos(new Array<IToDo>())
      return
    }

    const loadedToDos: IToDo[] = JSON.parse(savedData)

    setToDos(loadedToDos)
  }

  return (
    <div className="side-bar">
      <div className="side-bar-sessions">
        <button
          type="button"
          className={classnames(
            'side-bar-button session-button my-day-button',
            {
              active: activeGroup === 'My day',
            }
          )}
          onClick={() => setActiveGroup('My day')}
        >
          <DayIcon />
          My day
        </button>
        {groups &&
          groups.map((s) => (
            <button
              key={s}
              type="button"
              className={classnames('side-bar-button session-button', {
                active: activeGroup === s,
              })}
              onClick={() => setActiveGroup(s)}
            >
              {/* This needs working out */}
              {true ? (
                <CompleteIcon size="small" />
              ) : (
                <CircleIcon size="small" />
              )}
              {s}
            </button>
          ))}
        {creatingGroup ? (
          <AddGroup
            handleChange={(title: string | null) => {
              if (title) {
                addGroup(title)
              }

              setCreatingGroup(false)
            }}
            blurHandler={() => setCreatingGroup(false)}
          />
        ) : (
          <button
            type="button"
            className="side-bar-button session-button"
            onClick={() => setCreatingGroup(true)}
          >
            <PlusIcon />
            New group
          </button>
        )}
      </div>
      <div className="side-bar-settings">
        <button type="button" className="side-bar-button settings-button">
          <SettingsIcon /> Settings
        </button>
      </div>
      <dialog ref={ref}>Hello</dialog>
    </div>
  )
}
