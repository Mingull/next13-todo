import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import PaginationControlButton from "./PaginationControlButton";

export const paginationControlVariants = cva("inline-flex h-8 -space-x-px text-sm", {
	variants: {
		variant: {
			default: "",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

export interface PaginationControl
	extends React.HTMLAttributes<HTMLUListElement>,
		VariantProps<typeof paginationControlVariants> {
	activePage: number;
	totalPages: number;
	range: (number | "dots")[];
	goToPage: (pageNumber: number) => void;
}

/**
 * this is to wrap the dropdown on the right position
 */
const PaginationControl = React.forwardRef<HTMLUListElement, PaginationControl>(
	({ className, children, variant, activePage, totalPages, range, goToPage, ...props }, ref) => {
		return (
			<ul className="inline-flex h-8 -space-x-px text-sm" ref={ref} {...props}>
				{activePage > 1 ? (
					<PaginationControlButton
						onClick={() => goToPage(1)}
						// className="flex items-center justify-center h-8 px-3 leading-tight bg-white border rounded-l-lg text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
					>
						<span className="sr-only">First</span>
						<ChevronFirst />
					</PaginationControlButton>
				) : null}
				{activePage > 1 ? (
					<PaginationControlButton
						onClick={() => goToPage(activePage - 1)}
						className="flex items-center justify-center h-8 px-3 leading-tight bg-white border text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
					>
						<span className="sr-only">Previous</span>
						<ChevronLeft />
					</PaginationControlButton>
				) : null}
				{range.map((pageNumber) => {
					if (pageNumber !== "dots")
						return (
							<li key={pageNumber}>
								<button
									onClick={() => goToPage(pageNumber)}
									className={cn(
										"flex items-center justify-center h-8 px-3 border border-zinc-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white",
										{
											"bg-blue-500 dark:bg-zinc-600": pageNumber === activePage,
											"rounded-l-lg": pageNumber === 1,
											"rounded-r-lg": pageNumber === totalPages,
											"rounded-r-none": pageNumber !== 1 && pageNumber !== activePage,
											"rounded-l-none": pageNumber !== totalPages && pageNumber !== activePage,
										}
									)}
								>
									{pageNumber}
								</button>
							</li>
						);
					else return <></>;
				})}

				{activePage < totalPages ? (
					<li>
						<button
							onClick={() => goToPage(activePage + 1)}
							className="flex items-center justify-center h-8 px-3 leading-tight bg-white border text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<ChevronRight />
						</button>
					</li>
				) : null}
				{activePage < totalPages ? (
					<li>
						<button
							onClick={() => goToPage(totalPages)}
							className="flex items-center justify-center h-8 px-3 leading-tight bg-white border rounded-r-lg text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<ChevronLast />
						</button>
					</li>
				) : null}
			</ul>
		);
	}
);
PaginationControl.displayName = "PaginationControls";

export default PaginationControl;
