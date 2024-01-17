import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { IToDo } from '@/types'
import { useGroupStore } from '@/stores/group'

interface State {
  toDos: IToDo[]
}

interface Actions {
  addToDo: (title: string) => void
  updateToDo: (id: string, title: string) => void
  deleteToDo: (id: string) => void
  setToDoState: (id: string, newState: boolean) => void
  setToDos: (newToDos: IToDo[]) => void
  clearCompleted: () => void
}

function afterMagic(toDos: IToDo[]) {
  console.log('Maggicccccc')
  const groupStore = useGroupStore.getState()

  // Is the group now full of completed to dos?
  const isComplete = toDos.length > 0 && toDos.every((td) => td.completed)
  console.log(toDos)
  console.log(isComplete)
  groupStore.setGroupComplete(isComplete)

  // Update local storage
  const activeGroup = groupStore.activeGroup
  window.localStorage.setItem(`to-do-${activeGroup}`, JSON.stringify(toDos))
}

export const useToDoStore = create<State & Actions>((set) => ({
  toDos: new Array<IToDo>(),
  addToDo: (title) => {
    const newToDo: IToDo = {
      id: nanoid(),
      title,
      completed: false,
    }

    set((state) => {
      const newToDos = state.toDos.concat([newToDo])

      afterMagic(newToDos)

      return {
        toDos: newToDos,
      }
    })
  },
  updateToDo: (id, title) =>
    set((state) => {
      const newToDos = state.toDos.map((td) => {
        if (td.id === id) {
          return {
            ...td,
            title,
          }
        }

        return td
      })

      afterMagic(newToDos)

      return {
        toDos: newToDos,
      }
    }),
  deleteToDo: (id) =>
    set((state) => {
      const newToDos = state.toDos.filter((td) => td.id !== id)

      afterMagic(newToDos)

      return {
        toDos: newToDos,
      }
    }),
  setToDoState: (id, newState) =>
    set((state) => {
      const updatedToDos = state.toDos.map((td) => {
        if (td.id === id) {
          return {
            ...td,
            completed: newState,
          }
        }

        return td
      })

      afterMagic(updatedToDos)

      return {
        toDos: updatedToDos,
      }
    }),
  setToDos: (newToDos) =>
    set(() => {
      afterMagic(newToDos)

      return { toDos: newToDos }
    }),
  clearCompleted: () =>
    set((state) => {
      const updatedToDos = state.toDos.filter((td) => !td.completed)
      afterMagic(updatedToDos)

      return {
        toDos: updatedToDos,
      }
    }),
}))
