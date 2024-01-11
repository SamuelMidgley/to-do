import { create } from 'zustand'
import { IGroup } from '../types'
import { nanoid } from 'nanoid'

interface GroupState {
  groups: IGroup[]
  activeGroup: string
  setActiveGroup: (id: string) => void
  addGroup: (title: string) => void
  setGroups: (newGroups: IGroup[]) => void
}

export const useGroupStore = create<GroupState>((set) => ({
  groups: [
    {
      id: 'My day',
      title: 'My day',
    },
  ],
  activeGroup: 'My day',
  setActiveGroup: (id) => set({ activeGroup: id }),
  addGroup: (title) => {
    const newGroup = {
      id: nanoid(),
      title,
    }

    set((state) => {
      const newGroups = state.groups.concat([newGroup])
      window.localStorage.setItem('todo-groups', JSON.stringify(newGroups))
      return { groups: newGroups }
    })
  },
  setGroups: (newGroups) => set({ groups: newGroups }),
}))
