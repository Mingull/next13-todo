import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, Variants, motion } from "framer-motion";
import React from "react";
import { useDropdown } from "../Dropdown.context";

export const dropdownWrapperVariants = cva(
	"absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-zinc-600 shadow dark:divide-gray-600 overflow-x-hidden",
	{
		variants: {
			variant: {
				default: "",
			},
			position: {
				top: "bottom-full mb-3",
				bottom: "top-full mt-3",
				left: "right-full mr-3",
				right: "left-full ml-3",
			},
		},
		defaultVariants: {
			variant: "default",
			position: "bottom",
		},
	}
);

export interface DropdownWrapperProps
	extends Omit<
			React.HTMLAttributes<HTMLDivElement>,
			"children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		MotionProps,
		VariantProps<typeof dropdownWrapperVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const DropdownWrapper = React.forwardRef<HTMLDivElement, DropdownWrapperProps>(
	({ className, children, variant, ...props }, ref) => {
		const { position, setIsOpen, useClickOutside } = useDropdown();

		useClickOutside(() => setIsOpen(false));

		const animationVariants: Variants = {
			open: { height: "fit-content" },
			close: { height: "0%" },
		};
		return (
			<motion.div
				variants={{
					open: {
						clipPath: "inset(-10% -10% -10% -10% round 10px)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.75,
						},
					},
					closed: {
						clipPath: "inset(10% 50% 90% 50% round 10px)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.35,
						},
					},
				}}
				className={cn(dropdownWrapperVariants({ variant, position, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</motion.div>
		);
	}
);
DropdownWrapper.displayName = "DropdownWrapper";

export default DropdownWrapper;
