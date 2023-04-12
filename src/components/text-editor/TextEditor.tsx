import { useRef } from 'preact/hooks'

interface AutoResizeProps {
  value: string
  setValue: (value: string) => void
}

export default function TextEditor(props: AutoResizeProps) {
  const { value, setValue } = props
  const ref = useRef<HTMLDivElement>(null)

  function onBlurHandler() {
    if (ref.current) {
      setValue(ref.current.innerText)
    }
  }

  return (
    <div
      contentEditable
      ref={ref}
      onBlur={onBlurHandler}
      className="text-editor"
      dangerouslySetInnerHTML={{ __html: value }}
    />
  )
}
