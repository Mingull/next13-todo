import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const paginationControlVariants = cva(
	"absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600 transition duration-200 ease-linear",
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

export interface PaginationControl
	extends React.HTMLAttributes<HTMLSpanElement>,
		VariantProps<typeof paginationControlVariants> {
	total: number;
	start: number;
	end: number;
}

const PaginationTotal = React.forwardRef<HTMLDivElement, PaginationControl>(
	({ className, children, variant, total, start, end, ...props }, ref) => {
		return (
			<span className="text-sm font-normal text-zinc-500 dark:text-zinc-400" ref={ref} {...props}>
				Showing{" "}
				<span className="font-semibold text-zinc-900 dark:text-white">
					{start + 1}-{total > end ? end : total}
				</span>{" "}
				of <span className="font-semibold text-zinc-900 dark:text-white">{total}</span>
			</span>
		);
	}
);
PaginationTotal.displayName = "PaginationControl";

export default PaginationTotal;
