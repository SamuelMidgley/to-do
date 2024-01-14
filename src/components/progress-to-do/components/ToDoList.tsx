import { AddToDo } from './AddToDo'
import { CompletedToDos } from './CompletedToDos'
import { IncompleteToDos } from './IncompleteToDos'

export function ToDoList() {
  return (
    <>
      <IncompleteToDos />
      <AddToDo />
      <CompletedToDos />
    </>
  )
}
