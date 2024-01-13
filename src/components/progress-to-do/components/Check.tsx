import { CircleIcon, CompleteIcon } from '@/icons'

interface CheckProps {
  checked: boolean
  setChecked: () => void
}

export function Check(props: CheckProps) {
  const { checked, setChecked } = props

  return (
    <button type="button" className="check-icon" onClick={setChecked}>
      {checked ? <CompleteIcon size={22} /> : <CircleIcon size={22} />}
    </button>
  )
}
