import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { X } from "lucide-react";
import React from "react";
import { useSidebar } from "../Sidebar.context";

export const sidebarHeaderVariants = cva("inline-flex items-center justify-between w-full py-1", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface SidebarHeaderProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof sidebarHeaderVariants> {
	ButtonElement?: typeof Button;
}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarHeader = React.forwardRef<HTMLDivElement, SidebarHeaderProps>(
	({ className, children, variant, ButtonElement, ...props }, ref) => {
		const { setIsOpen } = useSidebar();

		return (
			<div className={cn(sidebarHeaderVariants({ variant, className }))} ref={ref} {...props}>
				{ButtonElement ? (
					<ButtonElement />
				) : (
					<Button type="button" variant={"ghost"} className="h-auto p-1">
						<X
							className="w-6 h-6"
							onClick={() => {
								setIsOpen(false);
							}}
						/>
						<span className="sr-only">Close menu</span>
					</Button>
				)}
				{children}
			</div>
		);
	}
);
SidebarHeader.displayName = "DropdownHeader";

export default SidebarHeader;
