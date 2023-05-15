import { Group } from '../../app'
import {
  CircleIcon,
  CompleteIcon,
  DayIcon,
  LogOutIcon,
  PlusIcon,
  SettingsIcon,
} from '../../icons'
import './SideBar.css'

import classnames from 'classnames'

interface SideBarProps {
  activeGroup: number
  setActiveGroup: (newGroup: number) => void
  groups: Group[]
}

export default function SideBar(props: SideBarProps) {
  const { groups, activeGroup, setActiveGroup } = props

  async function signOutHandler() {
    // ADD VALIDATION
  }

  return (
    <div className="side-bar">
      <div className="side-bar-sessions">
        <button
          type="button"
          className={classnames(
            'side-bar-button session-button my-day-button',
            {
              active: activeGroup === 0,
            }
          )}
          onClick={() => setActiveGroup(0)}
        >
          <DayIcon />
          My day
        </button>
        {groups &&
          groups.map((s) => (
            <button
              key={s.id}
              type="button"
              className={classnames('side-bar-button session-button', {
                active: activeGroup === s.id,
              })}
              onClick={() => setActiveGroup(s.id)}
            >
              {/* This needs working out */}
              {true ? (
                <CompleteIcon size="small" />
              ) : (
                <CircleIcon size="small" />
              )}
              {s.title}
            </button>
          ))}
        <button type="button" className="side-bar-button session-button">
          <PlusIcon />
          New group
        </button>
      </div>
      <div className="side-bar-settings">
        <button type="button" className="side-bar-button settings-button">
          <SettingsIcon /> Settings
        </button>
        <button
          type="button"
          className="side-bar-button settings-button"
          onClick={signOutHandler}
        >
          <LogOutIcon /> Log Out
        </button>
      </div>
    </div>
  )
}
