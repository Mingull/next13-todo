"use client";
import { Button } from "@/components/Button";
import { useSidebar } from "@/components/Sidebar/Sidebar.context";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { FC } from "react";

interface HamburgerProps {}

const Hamburger: FC<HamburgerProps> = ({}) => {
	const { setIsOpen } = useSidebar();
	const MButton = motion(Button);
	return (
		<MButton
			onClick={() => {
				console.log("clicked");
				setIsOpen(true);
			}}
			whileHover={{
				scale: 1.05,
			}}
			variant={"subtle"}
			size={"pill-md"}
		>
			<Menu className="hover:cursor-pointer" />
		</MButton>
	);
};

export default Hamburger;
