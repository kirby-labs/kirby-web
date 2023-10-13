import { Slot } from '@radix-ui/react-slot'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { ButtonProps } from './button'

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps & { loading?: boolean }>(
  ({ className, variant, size, asChild = false, loading = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        {...(loading
          ? {
              disabled: true,
            }
          : undefined)}
      >
        {loading && <span className="inline-flex mr-2 w-4 h-4 animate-spin i-lucide:loader-2" />} {props.children}
      </Comp>
    )
  }
)

export { LoadingButton }
