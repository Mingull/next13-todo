import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { MotionProps, motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { useSidebar } from "../Sidebar.context";
import { sidebarBodyVariants } from "../SidebarBody";
import { ChevronDown } from "lucide-react";

export const sidebarItemVariants = cva(
	"flex items-center w-full p-2 text-base text-gray-900 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
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

export interface SidebarItemProps
	extends Omit<
			React.LiHTMLAttributes<HTMLLIElement>,
			"onAnimationStart" | "onDragStart" | "onDragEnd" | "onDrag" | "style"
		>,
		Omit<MotionProps, "children">,
		VariantProps<typeof sidebarItemVariants> {
	title: string;
	multi?: boolean;
	icon?: React.ReactNode;
	pill?: {
		value: string;
		color?: string;
		bgColor?: string;
	};
	href?: string;
}

/**
 * this is to wrap the dropdown on the right position
 */
const SidebarItem = React.forwardRef<HTMLLIElement, SidebarItemProps>(
	({ className, children, title, icon, pill, variant, href, multi, ...props }, ref) => {
		const [isOpen, setIsOpen] = useState<boolean>(false);
		if (!multi) {
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
				>
					{href ? (
						<Link href={href} className={cn(sidebarItemVariants({ variant, className }))}>
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
							<span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
							{pill ? (
								<span
									className={`inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300`}
								>
									{pill.value}
								</span>
							) : null}
						</Link>
					) : (
						<button className={cn(sidebarItemVariants({ variant, className }), "")}>
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
							{pill ? (
								<span
									className={`inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300`}
								>
									{pill.value}
								</span>
							) : null}
						</button>
					)}
				</motion.li>
			);
		}
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
					<Link href={href} className={cn(sidebarItemVariants({ variant, className }))}>
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
					<button className={cn(sidebarItemVariants({ variant, className }))}>
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
SidebarItem.displayName = "SidebarItem";

export default SidebarItem;
