import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Timer } from '@/components/focus/components/Timer'

interface IFocus {
  toDoId: number
  open: boolean
  setOpen: (newState: boolean) => void
}

export function Focus({ toDoId, open, setOpen }: IFocus) {
  const [value, setValue] = useState('')
  const [showTimer, setShowTimer] = useState(false)

  function stopTimer() {
    setShowTimer(false)
    setValue('')
  }

  function onOpenChangeHandler(open: boolean) {
    setOpen(open)
    stopTimer()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChangeHandler}>
      <DialogContent>
        <div className="mt-4">
          {!showTimer ? (
            <div className="flex justify-between items-end gap-2">
              <div className="flex-grow">
                <label htmlFor="timer">Number of minutes</label>
                <Input
                  id="timer"
                  className="mt-2"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === 'Enter' &&
                      Number(value) &&
                      Number(value) > 0
                    ) {
                      setShowTimer(true)
                    }
                  }}
                />
              </div>

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
            <div className="flex items-center justify-center my-4">
              <Timer
                toDoId={toDoId}
                duration={Number(value)}
                stopTimer={() => stopTimer()}
              />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
