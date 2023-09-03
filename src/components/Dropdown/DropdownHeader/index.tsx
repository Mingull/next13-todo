import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { PropsWithChildren } from "react";

export const DropdownHeaderVariants = cva("px-4 py-3 text-sm text-gray-900 dark:text-white ", {
	variants: {
		variant: {
			default: "",
		},
		size: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

export interface DropdownHeaderProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof DropdownHeaderVariants> {}

const DropdownHeader = React.forwardRef<HTMLDivElement, DropdownHeaderProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<div className={cn(DropdownHeaderVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</div>
		);
	}
);
DropdownHeader.displayName = "DropdownHeader";

export default DropdownHeader;
