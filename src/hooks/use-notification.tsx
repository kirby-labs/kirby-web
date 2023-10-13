import type { ReactNode } from 'react'

import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export const useNotification = () => {
  const { toast } = useToast()

  return {
    toast: (
      type: 'info' | 'error' = 'error',
      options: {
        title?: ReactNode
        description?: ReactNode
        action?: ReactNode
        className?: string
        duration?: number
      }
    ) => {
      toast({
        variant: type === 'error' ? 'destructive' : 'default',
        title: options.title as any,
        description: options.description,
        action: <ToastAction altText={type}>{options.action}</ToastAction>,
        duration: options.duration || 5000,
        className: options.className || '',
      })
    },
  }
}
