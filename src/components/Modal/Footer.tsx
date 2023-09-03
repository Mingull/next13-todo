"use client";
import { FC } from "react";

export interface FooterProps {
	children: React.ReactNode;
}

const Footer: FC<FooterProps> = ({ children }) => {
	return <div className="p-6 border-t border-gray-200 rounded-b dark:border-gray-600">{children}</div>;
};

export default Footer;
