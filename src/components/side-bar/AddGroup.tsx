import { useEffect, useRef, useState } from 'react'
import { CircleIcon } from '@/icons'
import './AddGroup.css'

interface IAddGroup {
  handleChange: (title: string | null) => void
  blurHandler: () => void
}

export function AddGroup({ handleChange, blurHandler }: IAddGroup) {
  const [value, setValue] = useState('')
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  function onKeyDownHandler(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.stopPropagation()
      e.preventDefault()
      handleChange(value)
    }
  }

  return (
    <div className="add-group">
      <CircleIcon size="small" />
      <input
        ref={ref}
        className="input"
        value={value}
        onInput={(e) => {
          setValue(e.currentTarget.value)
        }}
        onKeyDown={onKeyDownHandler}
        onBlur={blurHandler}
      />
    </div>
  )
}
