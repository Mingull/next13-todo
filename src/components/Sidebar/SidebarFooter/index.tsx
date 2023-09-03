import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import React from "react";
import { useSidebar } from "../Sidebar.context";

export const sidebarFooterVariants = cva("absolute bottom-0 mb-4", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface SidebarFooterProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sidebarFooterVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarFooter = React.forwardRef<HTMLDivElement, SidebarFooterProps>(
	({ className, children, variant, ...props }, ref) => {
		const { setIsOpen } = useSidebar();

		return (
			<div className={cn(sidebarFooterVariants({ variant, className }))} ref={ref} {...props}>
				{children}
			</div>
		);
	}
);
SidebarFooter.displayName = "DropdownFooter";

export default SidebarFooter;
