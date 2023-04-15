import './app.css'
import { AddToDo, ToDoItem, ProgressBar, SideBar } from './components'
import { useState } from 'preact/hooks'
import { BinIcon } from './icons'

export type ToDoState = 'incomplete' | 'hold' | 'completed'

const date = new Date()

export interface ToDo {
  id: number
  text: string
  state: ToDoState
}

const InitialState: ToDo[] = [
  {
    id: 1,
    text: 'Gotta do this',
    state: 'incomplete',
  },
  {
    id: 2,
    text: 'Also gotta do this',
    state: 'incomplete',
  },
  {
    id: 3,
    text: 'Woo this is done',
    state: 'completed',
  },
]

export interface AppProps {
  supabaseClient: any
}

export default function App(props: AppProps) {
  const { supabaseClient } = props
  const [todos, setToDos] = useState<ToDo[]>(InitialState)
  const [activeGroup, setActiveGroup] = useState<string>('My day')

  function setState(id: number, state: ToDoState) {
    setToDos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            state,
          }
        }

        return item
      })
    )
  }

  function clearCompleted() {
    setToDos((prev) => prev.filter((item) => item.state !== 'completed'))
  }

  function addToDo(text: string) {
    let newId: number
    if (todos.length > 0) {
      newId = todos[todos.length - 1].id + 1
    } else {
      newId = 1
    }
    setToDos((prev) =>
      prev.concat([
        {
          id: newId,
          text,
          state: 'incomplete',
        },
      ])
    )
  }

  function updateToDo(id: number, text: string) {
    setToDos((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            text,
          }
        }
        return item
      })
    )
  }

  const incompleteToDos = todos.filter((item) => item.state === 'incomplete')
  const completedToDos = todos.filter((item) => item.state === 'completed')

  return (
    <>
      <SideBar
        supabaseClient={supabaseClient}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
      />
      <div className="app-container">
        <h1 style={{ margin: '0px' }}>
          {date.toLocaleString('default', { weekday: 'long' })},
        </h1>
        <h2 style={{ marginTop: '0px' }}>
          {date.toLocaleString('default', { day: 'numeric' })}&nbsp;
          {date.toLocaleString('default', { month: 'long' })}
        </h2>
        <ProgressBar
          completed={completedToDos.length}
          totalNum={todos.length}
        />
        <h2>To do</h2>
        <ul>
          {incompleteToDos.map((item) => (
            <li key={item.id}>
              <ToDoItem
                item={item}
                setState={setState}
                updateText={updateToDo}
              />
            </li>
          ))}
        </ul>
        <AddToDo addItem={addToDo} />

        {completedToDos.length > 0 && (
          <div>
            <div className="completed-header">
              <h3>Completed</h3>
              <button type="button" onClick={clearCompleted}>
                <BinIcon />
              </button>
            </div>
            <ul>
              {completedToDos.map((item) => (
                <li key={item.id}>
                  <ToDoItem
                    item={item}
                    setState={setState}
                    updateText={updateToDo}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
