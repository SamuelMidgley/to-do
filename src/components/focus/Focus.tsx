import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Timer } from '@/components/focus/Timer'

export function Focus() {
  const [value, setValue] = useState('')
  const [showTimer, setShowTimer] = useState(false)

  return (
    <div>
      {!showTimer ? (
        <div>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <Button
            onClick={() => {
              if (Number(value) && Number(value) > 0) {
                setShowTimer(true)
              }
            }}
          >
            Go
          </Button>
        </div>
      ) : (
        <Timer duration={Number(value)} />
      )}
    </div>
  )
}
