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

      const activeGroup = useGroupStore.getState().activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(newToDos)
      )

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

      const activeGroup = useGroupStore.getState().activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(newToDos)
      )

      return {
        toDos: newToDos,
      }
    }),
  deleteToDo: (id) =>
    set((state) => {
      const newToDos = state.toDos.filter((td) => td.id !== id)

      const activeGroup = useGroupStore.getState().activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(newToDos)
      )

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

      const groupStore = useGroupStore.getState()

      const isComplete = updatedToDos.every((td) => td.completed)
      groupStore.setGroupComplete(isComplete)

      const activeGroup = groupStore.activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(updatedToDos)
      )

      return {
        toDos: updatedToDos,
      }
    }),
  setToDos: (newToDos) =>
    set(() => {
      const activeGroup = useGroupStore.getState().activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(newToDos)
      )

      return { toDos: newToDos }
    }),
  clearCompleted: () =>
    set((state) => {
      const updatedToDos = state.toDos.filter((td) => !td.completed)

      const activeGroup = useGroupStore.getState().activeGroup
      window.localStorage.setItem(
        `to-do-${activeGroup}`,
        JSON.stringify(updatedToDos)
      )

      return {
        toDos: updatedToDos,
      }
    }),
}))
