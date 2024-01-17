import { useTheme, Radius } from '@/components/theme/ThemeProvider'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface IRadiusButton {
  className: Radius
  size: number
}

export function RadiusButton({ className, size }: IRadiusButton) {
  const { radius, setRadius } = useTheme()

  return (
    <Button
      variant="ghost"
      className={cn('border-2', radius === className && 'border-ring')}
      onClick={() => setRadius(className)}
    >
      {size}
    </Button>
  )
}
