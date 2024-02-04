import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ProgressToDo } from '@/components/progress-to-do/ProgressToDo'
import { ThemeProvider } from '@/components/theme/ThemeProvider'
import { Header } from '@/components/header/Header'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Header />
        <div className="flex w-full">
          <div className="w-[600px] max-w-[90%] mx-auto">
            <ProgressToDo />
          </div>
        </div>
      </ThemeProvider>
    </QueryClientProvider>
  )
}
