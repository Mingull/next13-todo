import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

export const paginationControlButtonVariants = cva(
	"flex items-center justify-center h-8 px-3 leading-tight bg-white border rounded-l-lg text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white",
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

export interface PaginationControl
	extends React.HTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof paginationControlButtonVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const PaginationControlButton = React.forwardRef<HTMLButtonElement, PaginationControl>(
	({ className, children, variant, onClick, ...props }, ref) => {
		return (
			<li>
				<button
					onClick={onClick}
					className={cn(paginationControlButtonVariants({ variant, className }))}
					ref={ref}
					{...props}
				>
					{children}
				</button>
			</li>
		);
	}
);
PaginationControlButton.displayName = "PaginationControlButton";

export default PaginationControlButton;
