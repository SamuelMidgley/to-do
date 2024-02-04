import axiosClient from '@/services/axiosClient'
import { GroupId, IToDo } from '@/types'
import { CreateToDoRequest } from '@/types/todo/CreateToDoRequest'

function getToDoList(groupId: GroupId): Promise<IToDo[]> {
  if (groupId === 'My day') {
    return axiosClient.get<IToDo[]>('v1/todo/myday').then((res) => res.data)
  }

  return axiosClient.get<IToDo[]>(`v1/todo/${groupId}`).then((res) => res.data)
}

function addToDo(item: CreateToDoRequest) {
  return axiosClient.post('v1/todo', item).then((res) => res.data)
}

function deleteToDo(id: number) {
  return axiosClient.delete(`v1/todo/${id}`).then((res) => res.data)
}

function updateToDoState(id: number, completed: boolean) {
  return axiosClient
    .patch(`v1/todo/${id}?completed=${completed}`)
    .then((res) => res.data)
}

function updateToDoTitle(id: number, title: string) {
  return axiosClient.patch(`v1/todo/${id}`, { title }).then((res) => res.data)
}

function deleteCompletedToDosFromGroup(id: number) {
  return axiosClient
    .delete(`v1/todo/group/${id}?completed=true`)
    .then((res) => res.data)
}

function deleteToDosFromGroup(id: number, completed: boolean) {
  let url = `v1/todo/group/${id}`
  if (completed) {
    url += '?completed=true'
  }
  return axiosClient.delete(`v1/todo/group/${id}`).then((res) => res.data)
}

export default {
  getToDoList,
  addToDo,
  deleteToDo,
  updateToDoState,
  updateToDoTitle,
  deleteCompletedToDosFromGroup,
  deleteToDosFromGroup,
}
