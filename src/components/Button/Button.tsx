import * as React from "react";
import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

export const buttonVariants = cva(
	"inline-flex items-center justify-center text-sm font-medium transition-all rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 disabled:opacity-50 dark:focus:ring-red-400 disabled:pointer-events-none dark:focus:ring-offset-zinc-900 data-[state=open]:bg-zinc-100 dark:data-[state=open]:bg-zinc-800",
	{
		variants: {
			variant: {
				default:
					"bg-zinc-700 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:border dark:hover:border-zinc-600",
				destructive: "bg-red-500 text-white hover:bg-red-600 dark:hover:bg-red-700",
				creative: "bg-green-500 text-white hover:bg-green-600 dark:hover:bg-green-700",
				cta: "bg-red-500 text-white font-semibold text-lg hover:bg-red-600",
				outline:
					"bg-transparent border border-zinc-200 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-700",
				subtle: "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-700 dark:text-zinc-100",
				ghost: "bg-transparent dark:bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 dark:text-zinc-100 dark:hover:text-zinc-100 data-[state=open]:bg-transparent dark:data-[state=open]:bg-transparent",
				link: "bg-transparent dark:bg-transparent underline-offset-4 hover:underline text-zinc-900 dark:text-zinc-300 hover:bg-transparent dark:hover:bg-transparent",
			},
			size: {
				sm: "h-9 px-2 rounded-md",
				default: "h-10 py-2 px-4",
				lg: "h-11 px-8 rounded-md",
				cta: "h-10 py-2 px-12 rounded-full",
				"pill-sm": "p-1 rounded-full",
				"pill-md": "p-2 rounded-full",
				pill: "p-3 rounded-full",
				"pill-lg": "p-4 rounded-full",
				"pill-xl": "p-5 rounded-full",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, children, href, variant, size, ...props }, ref) => {
		if (href) {
			return (
				<Link href={href} className={cn(buttonVariants({ variant, size, className }))}>
					{children}
				</Link>
			);
		}
		return (
			<button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
				{children}
			</button>
		);
	}
);
Button.displayName = "Button";

export default Button;
