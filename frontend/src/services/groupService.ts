import axiosClient from '@/services/axiosClient'
import { CreateGroupRequest, GroupId, IGroup } from '@/types'

function getGroupById(id: GroupId): Promise<IGroup> {
  if (id === 'My day') {
    return new Promise(() => {
      return {
        id: 'My day',
        title: 'My day',
      }
    })
  }

  return axiosClient.get<IGroup>(`v1/group/${id}`).then((res) => res.data)
}

function getGroups(): Promise<IGroup[]> {
  return axiosClient.get<IGroup[]>('v1/group').then((res) => res.data)
}

function postGroup(group: CreateGroupRequest) {
  return axiosClient.post('v1/group', group).then((res) => res.data)
}

function deleteGroup(id: number) {
  return axiosClient.delete(`v1/group/${id}`).then((res) => res.data)
}

function updateGroup(group: IGroup) {
  return axiosClient.put('v1/group', group).then((res) => res.data)
}

export default { getGroupById, getGroups, postGroup, deleteGroup, updateGroup }
