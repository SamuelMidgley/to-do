import { Ref, useRef } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'

interface AutoResizeProps {
  value: string
  setValue: (value: string) => void
  onBlurHandler: () => void
}

function resizeHandler(ref: Ref<HTMLTextAreaElement>) {
  if (ref.current) {
    // We need to reset the height momentarily to get the correct scrollHeight for the textarea
    ref.current.style.height = '0px'
    const scrollHeight = ref.current.scrollHeight

    // We then set the height directly, outside of the render loop
    // Trying to set this with state or a ref will product an incorrect value.
    ref.current.style.height = scrollHeight + 'px'
  }
}

export default function AutoResize(props: AutoResizeProps) {
  const { value, setValue, onBlurHandler } = props
  const ref = useRef<HTMLTextAreaElement>(null)

  function onChangeHandler(e: JSXInternal.TargetedEvent<HTMLTextAreaElement>) {
    setValue((e.target as HTMLTextAreaElement).value)

    resizeHandler(ref)
  }

  function onKeyDownHandler(
    e: JSXInternal.TargetedKeyboardEvent<HTMLTextAreaElement>
  ) {
    if (e.key === 'Enter') {
      e.preventDefault()

      if (ref.current) {
        ref.current.blur()
      }
    }

    resizeHandler(ref)
  }

  return (
    <textarea
      className="to-do-input"
      ref={ref}
      value={value}
      onChange={(e) => onChangeHandler(e)}
      onKeyDown={(e) => onKeyDownHandler(e)}
      rows={1}
      onBlur={onBlurHandler}
    />
  )
}
