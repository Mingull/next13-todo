import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import React, { useEffect } from "react";
import { MotionProps, Variants, motion, useAnimate } from "framer-motion";
import { url } from "inspector";
import { ChevronFirst, ChevronLeft, ChevronRight, ChevronLast } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

export const paginationWrapperVariants = cva(
	"flex items-center justify-between px-2 pt-3 pb-2 bg-zinc-50 dark:bg-zinc-600",
	{
		variants: {
			variant: {
				default: "",
			},
		},
		defaultVariants: {},
	}
);

export interface PaginationWrapper
	extends React.HTMLAttributes<HTMLElement>,
		VariantProps<typeof paginationWrapperVariants> {}

/**
 * this is to wrap the dropdown on the right position
 */
const PaginationWrapper = React.forwardRef<HTMLDivElement, PaginationWrapper>(
	({ className, children, variant, ...props }, ref) => {
		return (
			<nav className={cn(paginationWrapperVariants({ variant, className }))} ref={ref} {...props}>
				{children}
			</nav>
		);
	}
);
PaginationWrapper.displayName = "PaginationWrapper";

export default PaginationWrapper;
