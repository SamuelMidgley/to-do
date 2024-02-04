import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { StopIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import { getCountdownText } from '@/components/focus/helper'
import { CompleteIcon } from '@/icons'
import toDoService from '@/services/toDoService'

interface ITimer {
  toDoId: number
  duration: number
  stopTimer: () => void
}

export function Timer({ toDoId, duration, stopTimer }: ITimer) {
  const queryClient = useQueryClient()

  // turn to seconds from minutes
  const [timeRemaining, setTimeRemaining] = useState(duration * 60)
  const percent = (1 - timeRemaining / duration) * 100

  const toDoState = useMutation({
    mutationFn: (id: number) => toDoService.updateToDoState(id, true),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        const newTime = prevTime - 0.01

        if (newTime <= 0) {
          // Clear the interval when timeRemaining becomes 0
          clearInterval(intervalId)
        }

        if (newTime < 0) {
          return prevTime
        }

        return newTime
      })
    }, 10)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="w-[200px] h-[200px]">
        <CircularProgressbar
          strokeWidth={2}
          text={getCountdownText(timeRemaining)}
          value={100 - percent}
          styles={buildStyles({
            strokeLinecap: 'butt', // round
            // How long animation takes to go from one percentage to another, in seconds
            pathTransitionDuration: 0.25,
            pathColor: 'hsl(var(--primary))',
            trailColor: 'hsl(var(--primary) / 0.2)',
            backgroundColor: 'hsl(var(--background))',
            textColor: 'hsl(var(--foreground))',
          })}
        />
      </div>
      <div className="flex gap-10 justify-around">
        <Button
          className="items-center gap-2"
          variant="secondary"
          onClick={() => stopTimer()}
        >
          <StopIcon />
          Stop
        </Button>
        <Button
          className="items-center gap-2"
          variant="default"
          onClick={() => toDoState.mutate(toDoId)}
        >
          <CompleteIcon size={15} className="fill-primary-foreground" />
          Mark as complete
        </Button>
      </div>
    </div>
  )
}
