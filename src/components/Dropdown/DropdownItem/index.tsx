import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { Variants, motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Item } from "..";

export const dropdownItemVariants = cva(
	"block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
	{
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
	}
);

export interface DropdownItemProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof dropdownItemVariants> {
	item: Item;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
	({ className, children, variant, size, item, ...props }, ref) => {
		const itemVariants: Variants = {
			open: {
				opacity: 1,
				y: 0,
				transition: { type: "spring", stiffness: 300, damping: 24 },
			},
			closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
		};
		if (item.href) {
			return (
				<motion.li
					variants={itemVariants}
					key={item.title}
					whileHover={{ scale: 1.05 }}
					onClick={() => {
						console.log("clicked: ", item.href);
					}}
				>
					<Link href={item.href} className={cn(dropdownItemVariants({ variant, size, className }))}>
						{item.icon ? (
							<div className="flex">
								{item.icon}
								<span className="ml-2">{item.title}</span>
							</div>
						) : (
							item.title
						)}
					</Link>
				</motion.li>
			);
		}
		return (
			<motion.li variants={itemVariants} key={item.title} whileHover={{ scale: 1.05 }}>
				<button
					onClick={item.onClick}
					className={cn(dropdownItemVariants({ variant, size, className }), "w-full flex")}
					ref={ref}
					{...props}
				>
					{item.icon ? (
						<div className="flex">
							{item.icon}
							{item.title}
						</div>
					) : (
						item.title
					)}
				</button>
			</motion.li>
		);
	}
);
DropdownItem.displayName = "DropdownItem";

export default DropdownItem;
