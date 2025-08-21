import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cn } from "@/lib/utils";
import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

const alertVariants = tv({
  base: "relative w-full rounded-lg border p-4 [&>svg~*]:pl-8 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  variants: {
    variant: {
      default: "bg-background text-foreground",
      destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      success: "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-500",
      info: "border-blue-500/50 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-500",
      warning: "border-yellow-500/50 text-yellow-600 dark:border-yellow-500 [&>svg]:text-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const alertIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  info: Info,
  warning: AlertTriangle,
};

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => {
  const Icon = alertIcons[variant || "default"];
  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="h-5 w-5" />
      {/* The children, like AlertTitle and AlertDescription, will be rendered here */}
      <div className="ml-2">{props.children}</div>
    </div>
  );
});
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-bold leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };