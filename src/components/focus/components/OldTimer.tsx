import { useState, useEffect } from 'react'

interface IOldTimer {
  duration: number
}

export function OldTimer({ duration }: IOldTimer) {
  const [timeRemaining, setTimeRemaining] = useState(duration)
  const percent = Math.round((1 - timeRemaining / duration) * 100)
  const angle = Math.round((percent / 100) * 360)

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
    <div
      className="w-[200px] h-[200px] rounded-full flex items-center justify-center"
      style={{
        backgroundImage: `conic-gradient(hsl(var(--primary)) ${
          360 - angle
        }deg, transparent 0)`,
      }}
    >
      <div className="w-[190px] h-[190px] bg-background rounded-full flex items-center justify-center">
        {Math.round(timeRemaining)}s
      </div>
    </div>
  )
}
