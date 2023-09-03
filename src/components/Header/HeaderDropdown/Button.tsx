"use client";
import { motion } from "framer-motion";
import { ChevronUp, ChevronRight, ChevronLeft, ChevronDown, UserCircle } from "lucide-react";
import { FC } from "react";
import Dropdown, { Item } from "../../Dropdown";
import { useDropdown } from "../../Dropdown/Dropdown.context";
import Button from "../../Button/Button";
import Image from "next/image";
import { User } from "next-auth";

interface HeaderButton {
	user: User;
}

const HeaderButton: FC<HeaderButton> = ({ user }) => {
	const { toggleDropdown, position } = useDropdown();
	const RenderChevron = {
		bottom: motion(ChevronUp),
		left: motion(ChevronRight),
		right: motion(ChevronLeft),
		top: motion(ChevronDown),
	}[position];
	const MButton = motion(Button);
	return (
		<MButton
			type="button"
			variant={"cta"}
			size={"pill-sm"}
			className="items-center justify-between shadow bg-zinc-200 text-zinc-800 dark:bg-zinc-700 dark:text-zinc-200"
			onClick={toggleDropdown}
			initial={{ scale: 1 }}
			whileTap={{ scale: 0.9 }}
			whileHover={{ scale: [1.15, 0.9, 1.15], transition: { repeat: Infinity, repeatType: "loop" } }}
			transition={{ duration: 0.5 }}
		>
			<span className="sr-only">Open user menu</span>
			{user.image ? (
				<Image
					width={100}
					height={100}
					className="w-8 h-8 mr-2 rounded-full"
					src={user.image}
					alt={`${user.name} profile picture`}
				/>
			) : (
				<UserCircle />
			)}
			<div className="flex font-light">{user.name ?? "User"}</div>
			<motion.div
				variants={{
					open: { rotate: 180 },
					closed: { rotate: 0 },
				}}
				transition={{ duration: 0.2 }}
				className="ml-2.5"
			>
				<RenderChevron />
			</motion.div>
		</MButton>
	);
};

export default HeaderButton;
