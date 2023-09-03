import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const dropdownFooterVariants = cva("py-2", {
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

export interface DropdownFooterProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof dropdownFooterVariants> {}

const DropdownFooter = React.forwardRef<HTMLDivElement, DropdownFooterProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<div className={cn(dropdownFooterVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</div>
		);
	}
);
DropdownFooter.displayName = "DropdownFooter";

export default DropdownFooter;
