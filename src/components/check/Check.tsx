import CheckIcon from '../../icons/CheckIcon'

interface CheckProps {
  checked: boolean
  setChecked: () => void
}

export default function Check(props: CheckProps) {
  const { checked, setChecked } = props

  return (
    <button type="button" className="check-icon" onClick={setChecked}>
      {checked && <CheckIcon />}
    </button>
  )
}
