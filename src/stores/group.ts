import { create } from 'zustand'
import { nanoid } from 'nanoid'
import { IGroup } from '@/types'

interface State {
  groups: IGroup[]
  activeGroup: string
}

interface Actions {
  addGroup: (title: string) => void
  setActiveGroup: (id: string) => void
  setGroups: (newGroups: IGroup[]) => void
  setGroupComplete: (isComplete: boolean) => void
  updateGroup: (id: string, title: string) => void
  deleteGroup: (id: string) => void
}

export const useGroupStore = create<State & Actions>((set) => ({
  groups: [
    {
      id: 'My day',
      title: 'My day',
      completed: false,
    },
  ],
  activeGroup: 'My day',
  setActiveGroup: (id) => set({ activeGroup: id }),
  addGroup: (title) => {
    const newGroup = {
      id: nanoid(),
      title,
      completed: false,
    }

    set((state) => {
      const newGroups = state.groups.concat([newGroup])
      window.localStorage.setItem('todo-groups', JSON.stringify(newGroups))
      return { groups: newGroups }
    })
  },
  setGroups: (newGroups) => set({ groups: newGroups }),
  setGroupComplete: (isComplete) =>
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id === state.activeGroup) {
          return {
            ...g,
            completed: isComplete,
          }
        }
        return g
      }),
    })),
  updateGroup: (id, title) =>
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            title,
          }
        }
        return g
      }),
    })),
  deleteGroup: (id) =>
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    })),
}))
