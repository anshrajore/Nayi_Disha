
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props} className={`${props.variant === 'success' ? 'border-green-200 bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200 dark:border-green-800' : props.variant === 'destructive' ? 'border-red-200 bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200 dark:border-red-800' : ''}`}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

// Export as both Toaster and UIToaster for backwards compatibility
export { Toaster as UIToaster }
