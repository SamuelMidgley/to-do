import { nanoid } from 'nanoid'
import { create } from 'zustand'
import { IToDo } from '@/types'
import { useGroupStore } from './group'

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
    set((state) => ({ toDos: state.toDos.concat([newToDo]) }))
  },
  updateToDo: (id, title) =>
    set((state) => ({
      toDos: state.toDos.map((td) => {
        if (td.id === id) {
          return {
            ...td,
            title,
          }
        }

        return td
      }),
    })),
  deleteToDo: (id) =>
    set((state) => ({
      toDos: state.toDos.filter((td) => td.id !== id),
    })),
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

      console.log(updatedToDos)

      const isComplete = updatedToDos.every((td) => td.completed)

      console.log(isComplete)

      useGroupStore.getState().setGroupComplete(isComplete)

      return {
        toDos: updatedToDos,
      }
    }),
  setToDos: (newToDos) => set({ toDos: newToDos }),
  clearCompleted: () =>
    set((state) => ({
      toDos: state.toDos.filter((td) => !td.completed),
    })),
}))
