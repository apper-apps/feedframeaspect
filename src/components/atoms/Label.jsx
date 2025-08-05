import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/utils/cn"

const Label = forwardRef(({ className, children, translationKey, ...props }, ref) => {
  const { t } = useTranslation();
  
  const displayText = translationKey ? t(translationKey) : children;
  
  return (
    <label
      ref={ref}
      className={cn(
        "text-sm font-medium leading-none text-gray-700",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        className
      )}
      {...props}
    >
      {displayText}
    </label>
  )
})

Label.displayName = "Label"

export default Label