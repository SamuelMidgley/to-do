import './app.css'
import { AddToDo, ToDoItem, ProgressBar, SideBar } from './components'
import { BinIcon } from './icons'
import { useLayoutEffect, useState } from 'preact/hooks'

const date = new Date()

export interface Group {
  id: number
  title: string
}

export interface ToDo {
  id: number
  title: string
  completed: boolean
}

export default function App() {
  const [todos, setToDos] = useState<ToDo[]>(new Array<ToDo>())
  const [groups, setGroups] = useState<Group[]>(new Array<Group>())
  const [activeGroup, setActiveGroup] = useState<number>(0)

  function setState(id: number, state: boolean) {}

  function clearCompleted() {
    // send in all ids that are completed
    const completedToDoIds = todos
      .filter((item) => item.completed)
      .map((item) => item.id)

    console.log(completedToDoIds)
  }

  function addToDo(text: string) {}

  function updateToDo(id: number, text: string) {}

  function handleActiveGroupChange(newId: number) {
    if (newId === activeGroup) {
      return
    }
    setActiveGroup(newId)

    if (newId === 0) {
      return
    }
  }

  const incompleteToDos = todos.filter((item) => !item.completed)
  const completedToDos = todos.filter((item) => item.completed)

  return (
    <>
      <SideBar
        groups={groups}
        activeGroup={activeGroup}
        setActiveGroup={handleActiveGroupChange}
      />
      <div className="app-container">
        {activeGroup === 0 ? (
          <>
            <h1 style={{ margin: '0px' }}>
              {date.toLocaleString('default', { weekday: 'long' })},
            </h1>
            <h2 style={{ marginTop: '0px' }}>
              {date.toLocaleString('default', { day: 'numeric' })}&nbsp;
              {date.toLocaleString('default', { month: 'long' })}
            </h2>
          </>
        ) : (
          <h1 style={{ margin: '0px', marginBottom: '25px' }}>
            {groups.filter((g) => g.id === activeGroup)[0].title}
          </h1>
        )}

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
