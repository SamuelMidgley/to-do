import './app.css'
import { AddToDo, ToDoItem, ProgressBar, SideBar } from './components'
import { BinIcon } from './icons'
import { useLayoutEffect, useState } from 'preact/hooks'

const date = new Date()

export interface AppProps {
  supabaseClient: any
}

export interface Group {
  id: number
  title: string
}

export interface ToDo {
  id: number
  title: string
  completed: boolean
}

export default function App(props: AppProps) {
  const { supabaseClient } = props
  const [todos, setToDos] = useState<ToDo[]>(new Array<ToDo>())
  const [groups, setGroups] = useState<Group[]>(new Array<Group>())
  const [activeGroup, setActiveGroup] = useState<number>(0)

  function setState(id: number, state: boolean) {
    supabaseClient
      .from('todos')
      .update({ completed: state })
      .eq('id', id)
      .select()
      .then((resp: any) => {
        const { data, error } = resp
        if (error) {
          console.error(error)
          return
        }

        if (data.length === 0) {
          console.error('')
          return
        }

        const updatedToDo = data[0]

        console.log(updatedToDo)

        setToDos((prev) =>
          prev.map((item) => {
            if (item.id === updatedToDo.id) {
              return {
                ...item,
                completed: updatedToDo.completed,
              }
            }
            return item
          })
        )
      })
      .catch((err: any) => console.error(err))
  }

  function clearCompleted() {
    // send in all ids that are completed
    const completedToDoIds = todos
      .filter((item) => item.completed)
      .map((item) => item.id)

    console.log(completedToDoIds)

    // update
    supabaseClient
      .from('todos')
      .delete()
      .in('id', completedToDoIds)
      .then((resp: any) => {
        const { data, error } = resp
        if (error) {
          console.error(error)
          return
        }

        setToDos((prev) =>
          prev.filter((item) => !completedToDoIds.includes(item.id))
        )
      })
      .catch((err: any) => console.error(err))
  }

  function addToDo(text: string) {
    supabaseClient
      .from('todos')
      .insert({
        title: text,
        user_id: '8713f2e5-b0a0-46a6-83e5-91121a91bb63',
        session_id: 1,
      })
      .select()
      .then((resp: any) => {
        const { data, error } = resp
        if (error) {
          console.error(error)
          return
        }

        if (data.length === 0) {
          console.error('')
          return
        }

        const newToDo = data[0]

        console.log(newToDo)

        setToDos((prev) =>
          prev.concat([
            {
              id: newToDo.id,
              title: newToDo.title,
              completed: newToDo.completed,
            },
          ])
        )
      })
      .catch((err: any) => console.error(err))
  }

  function updateToDo(id: number, text: string) {
    supabaseClient
      .from('todos')
      .update({ title: text })
      .eq('id', id)
      .select()
      .then((resp: any) => {
        const { data, error } = resp
        if (error) {
          console.error(error)
          return
        }

        if (data.length === 0) {
          console.error('')
          return
        }

        const updatedToDo = data[0]

        console.log(updatedToDo)

        setToDos((prev) =>
          prev.map((item) => {
            if (item.id === updatedToDo.id) {
              return {
                ...item,
                title: updatedToDo.title,
              }
            }
            return item
          })
        )
      })
      .catch((err: any) => console.error(err))
  }

  useLayoutEffect(() => {
    supabaseClient
      .from('groups')
      .select()
      .then((result: any) => {
        const { data, error } = result
        if (error) {
          console.error(error)
        }

        const groups: Group[] = data.map((d: any) => {
          return {
            id: d.id,
            title: d.title,
          }
        })
        setGroups(groups)
      })
      .catch((err: any) => {
        console.error(err)
      })

    supabaseClient
      .from('todos')
      .select()
      .then((result: any) => {
        const { data, error } = result
        if (error) {
          console.error(error)
        }

        console.log(data)

        const todos: ToDo[] = data.map((d: any) => {
          return {
            id: d.id,
            title: d.title,
            completed: d.completed,
          }
        })

        setToDos(todos)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }, [])

  function handleActiveGroupChange(newId: number) {
    if (newId === activeGroup) {
      return
    }
    setActiveGroup(newId)

    if (newId === 0) {
      supabaseClient
        .from('todos')
        .select()
        .then((result: any) => {
          const { data, error } = result
          if (error) {
            console.error(error)
          }

          console.log(data)

          const todos: ToDo[] = data.map((d: any) => {
            return {
              id: d.id,
              title: d.title,
              completed: d.completed,
            }
          })

          setToDos(todos)
        })
        .catch((err: any) => {
          console.error(err)
        })
      return
    }

    supabaseClient
      .from('todos')
      .select()
      .eq('group_id', newId)
      .then((result: any) => {
        const { data, error } = result
        if (error) {
          console.error(error)
        }

        console.log(data)

        const todos: ToDo[] = data.map((d: any) => {
          return {
            id: d.id,
            title: d.title,
            completed: d.completed,
          }
        })

        setToDos(todos)
      })
      .catch((err: any) => {
        console.error(err)
      })
  }

  const incompleteToDos = todos.filter((item) => !item.completed)
  const completedToDos = todos.filter((item) => item.completed)

  return (
    <>
      <SideBar
        supabaseClient={supabaseClient}
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
