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
  supabaseClient: any
  activeGroup: string
  setActiveGroup: (newGroup: string) => void
  groups: Group[]
}

export default function SideBar(props: SideBarProps) {
  const { supabaseClient, groups, activeGroup, setActiveGroup } = props

  async function signOutHandler() {
    // ADD VALIDATION
    const { error } = await supabaseClient.auth.signOut()

    console.log(error)
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
              key={s.id}
              type="button"
              className={classnames('side-bar-button session-button', {
                active: activeGroup === s.title,
              })}
              onClick={() => setActiveGroup(s.title)}
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
