import { GroupId } from '..'

export interface IGroup {
  id: GroupId
  title: string
  completed?: boolean
}
