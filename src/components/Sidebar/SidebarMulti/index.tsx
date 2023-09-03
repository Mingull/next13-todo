import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, Variants, motion } from "framer-motion";
import React, { Children, useState } from "react";
import { useSidebar } from "../Sidebar.context";
import { Button } from "@/components/Button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export const sidebarMultiVariants = cva(
	"flex items-center w-full p-2 text-base text-gray-900  rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
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

export interface SidebarMultiProps
	extends Omit<
			React.LiHTMLAttributes<HTMLLIElement>,
			"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		Omit<MotionProps, "children">,
		VariantProps<typeof sidebarMultiVariants> {
	title: string;
	icon?: React.ReactNode;
	href?: string;
}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarMulti = React.forwardRef<HTMLLIElement, SidebarMultiProps>(
	({ className, children, title, icon, variant, href, ...props }, ref) => {
		const [isOpen, setIsOpen] = useState<boolean>(false);
		return (
			<motion.li
				variants={{
					open: {
						transform: "translateX(0)",
						transition: {
							type: "spring",
							bounce: 0,
							duration: 0.7,
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
				ref={ref}
				{...props}
				onClick={() => setIsOpen((prev) => !prev)}
			>
				{href ? (
					<Link href={href} className={cn(sidebarMultiVariants({ variant, className }))}>
						{icon
							? React.isValidElement<React.SVGAttributes<SVGElement>>(icon)
								? React.cloneElement(icon, {
										className: cn(
											"flex-shrink-0",
											"w-5",
											"h-5",
											"text-gray-500",
											"transition",
											"duration-75",
											"dark:text-gray-400",
											"group-hover:text-gray-900",
											"dark:group-hover:text-white",
											icon.props.className
										),
								  })
								: icon
							: null}
						<span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
						<ChevronDown />
					</Link>
				) : (
					<button className={cn(sidebarMultiVariants({ variant, className }))}>
						{icon
							? React.isValidElement<React.SVGAttributes<SVGElement>>(icon)
								? React.cloneElement(icon, {
										className: cn(
											"flex-shrink-0",
											"w-5",
											"h-5",
											"text-gray-500",
											"transition",
											"duration-75",
											"dark:text-gray-400",
											"group-hover:text-gray-900",
											"dark:group-hover:text-white",
											icon.props.className
										),
								  })
								: icon
							: null}
						<span className="flex-1 ml-3 text-left whitespace-nowrap">{title}</span>
						<ChevronDown />
					</button>
				)}
				{children}
			</motion.li>
		);
	}
);
SidebarMulti.displayName = "SidebarItem";

export default SidebarMulti;
