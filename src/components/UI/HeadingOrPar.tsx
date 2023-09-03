import { Enums } from "@/lib/types/Enums";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import * as React from "react";

export const headingVariants = cva("font-semibold", {
	variants: {
		font: {
			roboto: `${Enums.Fonts.ROBOTO.className}`,
			opensans: `${Enums.Fonts.OPENSANS.className}`,
			"baloo thambi": `${Enums.Fonts.BALOOTHAMBI.className}`,
		},
		size: {
			"5xl": "text-5xl",
			"4xl": "text-4xl",
			"3xl": "text-3xl",
			"2xl": "text-2xl",
			xl: "text-xl",
			lg: "text-lg",
			base: "text-base",
			sm: "text-sm",
			xs: "text-xs",
		},
	},
	defaultVariants: {
		font: "roboto",
		size: "base",
	},
});

export interface HeadingProps
	extends React.HTMLAttributes<HTMLHeadingElement | HTMLParagraphElement>,
		VariantProps<typeof headingVariants> {}

export const HeadingOrPar = React.forwardRef<
	HTMLHeadingElement,
	HeadingProps & { heading: "1" | "2" | "3" | "4" | "5" | "6" | "P" }
>(({ className, children, font, heading, size, ...props }, ref) => {
	switch (heading) {
		default:
		case "1":
			return (
				<h1 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h1>
			);
		case "2":
			return (
				<h2 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h2>
			);
		case "3":
			return (
				<h3 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h3>
			);
		case "4":
			return (
				<h4 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h4>
			);
		case "5":
			return (
				<h5 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h5>
			);
		case "6":
			return (
				<h6 className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</h6>
			);
		case "P":
			return (
				<p className={cn(headingVariants({ font, size, className }))} ref={ref} {...props}>
					{children}
				</p>
			);
	}
});

export const H1 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="1" size={size || "5xl"} font={font || "roboto"} {...props} ref={ref} />
));
export const H2 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="2" size={size || "4xl"} font={font || "roboto"} {...props} ref={ref} />
));
export const H3 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="3" size={size || "3xl"} font={font || "roboto"} {...props} ref={ref} />
));
export const H4 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="4" size={size || "2xl"} font={font || "roboto"} {...props} ref={ref} />
));
export const H5 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="5" size={size || "xl"} font={font || "roboto"} {...props} ref={ref} />
));
export const H6 = React.forwardRef<HTMLHeadingElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="6" size={size || "lg"} font={font || "roboto"} {...props} ref={ref} />
));
export const P = React.forwardRef<HTMLParagraphElement, HeadingProps>(({ size, font, ...props }, ref) => (
	<HeadingOrPar heading="P" size={size || "base"} font={font || "opensans"} {...props} ref={ref} />
));
