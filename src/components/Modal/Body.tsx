"use client";
import { FC } from "react";

export interface BodyProps {
	children: React.ReactNode;
}

const Body: FC<BodyProps> = ({ children }) => {
	return <div className="p-6 space-y-6">{children}</div>;
};

export default Body;
