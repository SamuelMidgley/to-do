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
}

interface Session {
  id: number
  title: string
  completed: boolean
}

export default function SideBar(props: SideBarProps) {
  const { supabaseClient, activeGroup, setActiveGroup } = props

  async function signOutHandler() {
    // ADD VALIDATION
    const { error } = await supabaseClient.auth.signOut()

    console.log(error)
  }

  const sessions: Session[] = [
    {
      id: 1,
      title: 'Portfolio',
      completed: true,
    },
    {
      id: 2,
      title: 'Gym app',
      completed: false,
    },
  ]

  function onSessionClickHandler(title: string) {}

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
        {sessions.map((s) => (
          <button
            type="button"
            className={classnames('side-bar-button session-button', {
              active: activeGroup === s.title,
            })}
            onClick={() => setActiveGroup(s.title)}
          >
            {s.completed ? (
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
