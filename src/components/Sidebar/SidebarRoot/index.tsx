"use client";
import { motion } from "framer-motion";
import { FC, useRef, useState } from "react";
import { SidebarProvider } from "../Sidebar.context";
import useClickOutside from "./useClickOutside";
import { useLocalStorage } from "@/lib/hooks";

interface SidebarRootProps {
	children: React.ReactNode;
}

const SidebarRoot: FC<SidebarRootProps> = ({ children }) => {
	const sidebarRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const toggleSidebar = () => {
		console.log("toggled");
		setIsOpen((prev) => !prev);
	};

	const settings = (set?: string | ((prevState: string) => string)) => {
		const [value, setValue] = useLocalStorage({ key: "sidebar-settings" });

		if (set) setValue(set);

		return value;
	};

	return (
		<SidebarProvider
			value={{
				isOpen,
				sidebarRef,
				setIsOpen,
				toggleSidebar,
				useClickOutside: (handler) => useClickOutside(handler, sidebarRef),
				settings,
			}}
		>
			<motion.div initial={false} animate={isOpen ? "open" : "closed"} ref={sidebarRef}>
				{children}
			</motion.div>
		</SidebarProvider>
	);
};

export default SidebarRoot;
