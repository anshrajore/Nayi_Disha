
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          success: 
            "group-[.toast]:bg-green-50 group-[.toast]:text-green-800 group-[.toast]:border-green-200 dark:group-[.toast]:bg-green-900 dark:group-[.toast]:text-green-100 dark:group-[.toast]:border-green-800",
          error:
            "group-[.toast]:bg-red-50 group-[.toast]:text-red-800 group-[.toast]:border-red-200 dark:group-[.toast]:bg-red-900 dark:group-[.toast]:text-red-100 dark:group-[.toast]:border-red-800",
          warning:
            "group-[.toast]:bg-yellow-50 group-[.toast]:text-yellow-800 group-[.toast]:border-yellow-200 dark:group-[.toast]:bg-yellow-900 dark:group-[.toast]:text-yellow-100 dark:group-[.toast]:border-yellow-800",
        },
      }}
      position="top-right"
      expand={false}
      closeButton
      richColors
      {...props}
    />
  )
}

// Export both Toaster component and toast function
export { Toaster, toast }
