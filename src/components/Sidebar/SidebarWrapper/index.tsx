import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, Variants, motion } from "framer-motion";
import React from "react";
import { useSidebar } from "../Sidebar.context";

export const sidebarWrapperVariants = cva(
	"fixed top-0 left-0 z-40 w-72 h-screen p-4 overflow-y-auto bg-white dark:bg-zinc-900",
	{
		variants: {
			variant: {
				default: "",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface SidebarWrapperProps
	extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			"children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		MotionProps,
		VariantProps<typeof sidebarWrapperVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarWrapper = React.forwardRef<HTMLDivElement, SidebarWrapperProps>(
	({ className, children, variant, ...props }, ref) => {
		const { useClickOutside, setIsOpen } = useSidebar();

		useClickOutside(() => setIsOpen(false));

		return (
			<motion.div
				variants={{
					open: {
						transform: "translateX(0)",
						transition: {
							type: "spring",
							bounce: 0.25,
							duration: 0.5,
						},
					},
					closed: {
						transform: "translateX(-100%)",
						transition: {
							type: "spring",
							bounce: 0.25,
							duration: 0.35,
						},
					},
				}}
				onAnimationComplete={(definition) => {
					console.log("Completed animating", definition);
				}}
				className={cn(sidebarWrapperVariants({ variant, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);
SidebarWrapper.displayName = "DropdownWrapper";

export default SidebarWrapper;
