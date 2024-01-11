import { create } from 'zustand'
import { IToDo } from '../types'
import { nanoid } from 'nanoid'

interface ToDoState {
  toDos: IToDo[]
  addToDo: (title: string) => void
  updateToDo: (id: string, title: string) => void
  setToDoState: (id: string, newState: boolean) => void
  setToDos: (newToDos: IToDo[]) => void
  clearCompleted: () => void
}

export const useToDoStore = create<ToDoState>((set) => ({
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
  setToDoState: (id, newState) =>
    set((state) => ({
      toDos: state.toDos.map((td) => {
        if (td.id === id) {
          return {
            ...td,
            completed: newState,
          }
        }

        return td
      }),
    })),
  setToDos: (newToDos) => set({ toDos: newToDos }),
  clearCompleted: () =>
    set((state) => ({
      toDos: state.toDos.filter((td) => !td.completed),
    })),
}))
