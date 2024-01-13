import { AddToDo, CompletedToDos, IncompleteToDos } from '@/components'

export default function ToDoList() {
  return (
    <>
      {/* <h2 className="text-2xl font-semibold mb-4">To do</h2> */}
      <IncompleteToDos />
      <AddToDo />
      <CompletedToDos />
    </>
  )
}
