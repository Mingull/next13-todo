"use client";
import { useTheme } from "@/lib/contexts/Theme.context";
import { FC } from "react";

interface HTMLProps extends React.HtmlHTMLAttributes<HTMLHtmlElement> {
	children: React.ReactNode;
}

const HTML: FC<HTMLProps> = ({ children, ...props }) => {
	const { theme } = useTheme();
	return (
		<html className={theme} {...props}>
			{children}
		</html>
	);
};

export default HTML;
