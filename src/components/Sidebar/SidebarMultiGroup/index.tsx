import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, Variants, motion } from "framer-motion";
import React from "react";
import { useSidebar } from "../Sidebar.context";

export const sidebarMultiGroupVariants = cva("space-y-2 font-medium", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface SidebarMultiGroupProps
	extends Omit<
			React.HTMLAttributes<HTMLUListElement>,
			"children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		MotionProps,
		VariantProps<typeof sidebarMultiGroupVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarMultiGroup = React.forwardRef<HTMLUListElement, SidebarMultiGroupProps>(
	({ className, children, variant, ...props }, ref) => {
		const { useClickOutside, setIsOpen } = useSidebar();

		return (
			<motion.ul
				variants={{
					open: {
						transform: "translateX(0)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.7,
							delayChildren: 0.3,
							staggerChildren: 0.1,
						},
					},
					closed: {
						transform: "translateX(-100%)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.3,
						},
					},
				}}
				onAnimationComplete={(definition) => {
					console.log("Completed animating", definition);
				}}
				className={cn(sidebarMultiGroupVariants({ variant, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</motion.ul>
		);
	}
);
SidebarMultiGroup.displayName = "SidebarMultiGroup";

export default SidebarMultiGroup;
