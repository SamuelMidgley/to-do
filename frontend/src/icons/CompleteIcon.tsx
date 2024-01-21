import { cn } from '@/lib/utils'
import { IconProps } from '.'

export default function CompleteIcon(props: IconProps) {
  const { size, className } = props

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      viewBox="0 96 960 960"
      width={size}
      className={cn('fill-foreground', className)}
    >
      <path d="M480 976q-83 0-156-31.5T197 859q-54-54-85.5-127T80 576q0-83 31.5-156T197 293q54-54 127-85.5T480 176q48 0 93.5 11t87.5 32q15 8 19.5 24t-5.5 30q-10 14-26.5 18t-32.5-4q-32-15-66.5-23t-69.5-8q-133 0-226.5 93.5T160 576q0 133 93.5 226.5T480 896q133 0 226.5-93.5T800 576q0-8-.5-15.5T798 545q-2-17 6.5-32.5T830 492q16-5 30 3t16 24q2 14 3 28t1 29q0 83-31.5 156T763 859q-54 54-127 85.5T480 976Zm-56-328 372-373q11-11 27.5-11.5T852 275q11 11 11 28t-11 28L452 732q-12 12-28 12t-28-12L282 618q-11-11-11-28t11-28q11-11 28-11t28 11l86 86Z" />
    </svg>
  )
}
