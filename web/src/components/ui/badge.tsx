import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { Slot } from 'radix-ui'

import { cn } from 'src/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-full border border-transparent px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 [a&]:hover:underline',
        orange:
          'bg-orange-600 text-white [a&]:hover:bg-orange-700 dark:bg-orange-600 dark:text-white dark:[a&]:hover:bg-orange-700',
        yellow:
          'bg-yellow-600 text-white [a&]:hover:bg-yellow-700 dark:bg-yellow-600 dark:text-white dark:[a&]:hover:bg-yellow-700',
        green:
          'bg-green-600 text-white [a&]:hover:bg-green-700 dark:bg-green-600 dark:text-white dark:[a&]:hover:bg-green-700',
        cyan: 'bg-cyan-600 text-white [a&]:hover:bg-cyan-700 dark:bg-cyan-600 dark:text-white dark:[a&]:hover:bg-cyan-700',
        blue: 'bg-blue-600 text-white [a&]:hover:bg-blue-700 dark:bg-blue-600 dark:text-white dark:[a&]:hover:bg-blue-700',
        purple:
          'bg-purple-600 text-white [a&]:hover:bg-purple-700 dark:bg-purple-600 dark:text-white dark:[a&]:hover:bg-purple-700',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
