import { ProgressToDo } from '@/components/progress-to-do/ProgressToDo'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Header } from '@/components/header/Header'
import { Focus } from './components/focus/Focus'

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <div className="flex w-full">
        <div className="w-[600px] max-w-[90%] mx-auto">
          <Focus />
          <ProgressToDo />
        </div>
      </div>
    </ThemeProvider>
  )
}
