import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, Variants, motion } from "framer-motion";
import React from "react";
import { useSidebar } from "../Sidebar.context";

export const sidebarBodyVariants = cva("py-4 overflow-y-auto divide-y divide-zinc-500", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface SidebarBodyProps
	extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			"children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		MotionProps,
		VariantProps<typeof sidebarBodyVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarBody = React.forwardRef<HTMLDivElement, SidebarBodyProps>(
	({ className, children, variant, ...props }, ref) => {
		const { useClickOutside, setIsOpen } = useSidebar();

		return (
			<motion.div
				variants={{
					open: {
						transition: {
							type: "spring",
							bounce: 0.25,
							duration: 0.7,
						},
					},
					closed: {
						transition: {
							type: "spring",
							bounce: 0.25,
							duration: 0.3,
						},
					},
				}}
				onAnimationComplete={(definition) => {
					console.log("Completed animating", definition);
				}}
				className={cn(sidebarBodyVariants({ variant, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);
SidebarBody.displayName = "DropdownWrapper";

export default SidebarBody;
