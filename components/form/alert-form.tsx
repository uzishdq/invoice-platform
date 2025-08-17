import { AlertCircleIcon, PopcornIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ComponentProps } from "react";

// Define variant types
type AlertVariant = "default" | "destructive";

// Define variant styles
const alertVariants: Record<AlertVariant, string> = {
  default: "bg-background text-foreground",
  destructive: "bg-red-50 text-red-800 border-red-500",
};

// Default icons for each variant
const defaultIcons: Record<AlertVariant, LucideIcon> = {
  default: PopcornIcon,
  destructive: AlertCircleIcon,
};

// Define props interface
interface CustomAlertProps extends ComponentProps<typeof Alert> {
  variant?: AlertVariant;
  icon?: LucideIcon;
  title?: string;
  description?: string;
}

export function CustomAlert({
  variant = "default",
  icon,
  title,
  description,
  className,
  ...props
}: CustomAlertProps) {
  const Icon = icon || defaultIcons[variant] || PopcornIcon;

  return (
    <div className="flex flex-col items-center justify-center h-full px-4">
      <Alert className={cn(alertVariants[variant], className)} {...props}>
        <Icon className="h-4 w-4" />
        {title && <AlertTitle>{title}</AlertTitle>}
        {description && <AlertDescription>{description}</AlertDescription>}
      </Alert>
    </div>
  );
}
