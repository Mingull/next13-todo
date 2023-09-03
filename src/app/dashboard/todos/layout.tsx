import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
	title: "Todos",
};

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
	return <div className="col-span-full">{children}</div>;
};

export default Layout;
