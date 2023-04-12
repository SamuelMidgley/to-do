import './app.css'
import AddToDo from './components/to-do/AddToDo'
import ToDoItem from './components/to-do/ToDo'
import ProgressBar from './components/progress-bar/ProgressBar'
import { useState } from 'preact/hooks'
import SideBar from './components/side-bar/SideBar'

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
    text: 'This is on hold',
    state: 'hold',
  },
  {
    id: 3,
    text: 'Woo this is done',
    state: 'completed',
  },
]

export default function App() {
  const [todos, setToDos] = useState<ToDo[]>(InitialState)

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
  const onHoldToDos = todos.filter((item) => item.state === 'hold')
  const completedToDos = todos.filter((item) => item.state === 'completed')

  return (
    <>
      <SideBar />
      <div>
        <h1 style={{ marginBottom: '0px' }}>
          {date.toLocaleString('default', { weekday: 'long' })},
        </h1>
        <h2 style={{ marginTop: '0px' }}>
          {date.toLocaleString('default', { day: 'numeric' })}&nbsp;
          {date.toLocaleString('default', { month: 'long' })}
        </h2>
        <ProgressBar
          completed={completedToDos.length}
          onHold={onHoldToDos.length}
          toDo={incompleteToDos.length}
          totalNum={todos.length}
        />
        <AddToDo addItem={addToDo} />
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

        {onHoldToDos.length > 0 && (
          <div>
            <h3>Paused</h3>
            <ul>
              {onHoldToDos.map((item) => (
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

        <div>
          <div className="completed-header">
            <h3>Completed</h3>
            {completedToDos.length > 0 && (
              <button type="button" onClick={clearCompleted}>
                🗑️
              </button>
            )}
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
      </div>
    </>
  )
}
