import { Moon, Sun } from 'lucide-react'

import { Button } from 'src/components/ui/button'
import { useTheme } from 'src/components/ui/theme-provider'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'src/components/ui/tooltip'
import { cn } from 'src/lib/utils'

export function ModeCycle() {
  const { resolvedTheme, setTheme } = useTheme()

  const nextTheme = resolvedTheme === 'light' ? 'dark' : 'light'

  const handleToggle = () => {
    setTheme(nextTheme)
  }

  return (
    <Tooltip>
      <Button
        variant="outline"
        size="icon"
        onClick={handleToggle}
        aria-label="Toggle theme"
        className={cn('relative')}
        asChild
      >
        <TooltipTrigger>
          <Sun
            className={`absolute transition-all ${
              resolvedTheme === 'light'
                ? 'scale-100 rotate-0'
                : 'scale-0 -rotate-90'
            }`}
          />
          <Moon
            className={`absolute transition-all ${
              resolvedTheme === 'dark'
                ? 'scale-100 rotate-0'
                : 'scale-0 rotate-90'
            }`}
          />
          <span className="sr-only">Toggle theme</span>
        </TooltipTrigger>
      </Button>
      <TooltipContent>
        Switch to <strong>{nextTheme}</strong> mode
      </TooltipContent>
    </Tooltip>
  )
}
