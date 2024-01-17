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

export const useGroupStore = create<State & Actions>((set, get) => ({
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
    const newGroupId = nanoid()

    const newGroup = {
      id: newGroupId,
      title,
      completed: false,
    }

    set((state) => {
      const newGroups = state.groups.concat([newGroup])
      window.localStorage.setItem('to-do-groups', JSON.stringify(newGroups))
      return { groups: newGroups }
    })

    get().setActiveGroup(newGroupId)
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
    set((state) => {
      const newGroups = state.groups.map((g) => {
        if (g.id === id) {
          return {
            ...g,
            title,
          }
        }
        return g
      })

      window.localStorage.setItem('to-do-groups', JSON.stringify(newGroups))

      return {
        groups: newGroups,
      }
    }),
  deleteGroup: (id) => {
    get().setActiveGroup('My day')
    set((state) => {
      const newGroups = state.groups.filter((g) => g.id !== id)
      window.localStorage.setItem('to-do-groups', JSON.stringify(newGroups))

      return {
        groups: newGroups,
      }
    })
    window.localStorage.removeItem(`to-do-${id}`)
  },
}))
