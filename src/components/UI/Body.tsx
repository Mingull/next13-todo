"use client";
import { useTheme } from "@/lib/contexts/Theme.context";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface BodyProps extends React.HTMLAttributes<HTMLBodyElement> {
	children: React.ReactNode;
}

const Body: FC<BodyProps> = ({ children, className, ...props }) => {
	return (
		<body className={cn(className)} {...props}>
			{children}
		</body>
	);
};

export default Body;
