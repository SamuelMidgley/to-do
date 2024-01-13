// import { SideBar } from './components'
import ProgressToDo from '@/components/progress-to-do/ProgressToDo'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Header } from './components/Header'

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="todo-ui-theme">
      <Header />
      <div className="flex w-full">
        <div className="w-[600px] max-w-[90%] mx-auto">
          <ProgressToDo />
        </div>
      </div>
    </ThemeProvider>
  )
}
