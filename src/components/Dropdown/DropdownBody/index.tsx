import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import { MotionProps, motion } from "framer-motion";

export const dropdownBodyVariants = cva("py-2 text-sm text-gray-700 dark:text-gray-200", {
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

export interface DropdownBodyProps
	extends Omit<
			React.HTMLAttributes<HTMLUListElement>,
			"children" | "onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		MotionProps,
		VariantProps<typeof dropdownBodyVariants> {}

const DropdownBody = React.forwardRef<HTMLUListElement, DropdownBodyProps>(
	({ className, children, variant, size, ...props }, ref) => {
		return (
			<motion.ul
				variants={{
					open: {
						width: "100%",
						height: "100%",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.7,
							delayChildren: 0.3,
							staggerChildren: 0.05,
						},
					},
					closed: {
						width: "0%",
						height: "0%",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.3,
						},
					},
				}}
				className={cn(dropdownBodyVariants({ variant, size, className }))}
				ref={ref}
				{...props}
			>
				{children}
			</motion.ul>
		);
	}
);
DropdownBody.displayName = "DropdownBody";

export default DropdownBody;
