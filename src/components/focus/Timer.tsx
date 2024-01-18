import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface ITimer {
  duration: number
}

export function Timer({ duration }: ITimer) {
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const percent = Math.round((1 - timeRemaining / duration) * 100)

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
    <div className="w-[200px] h-[200px]">
      <CircularProgressbar
        strokeWidth={2}
        value={100 - percent}
        styles={buildStyles({
          strokeLinecap: 'butt', // round
          // How long animation takes to go from one percentage to another, in seconds
          pathTransitionDuration: 0.25,
          pathColor: 'hsl(var(--primary))',
          trailColor: 'hsl(var(--primary) / 0.2)',
          backgroundColor: 'hsl(var(--background))',
        })}
      />
    </div>
  )
}
