"use client";
import { FC, useRef, useState } from "react";
import { DropdownProvider } from "../Dropdown.context";
import { Item } from "../";
import { Position } from "../Dropdown";
import { motion } from "framer-motion";
import useClickOutside from "./useClickOutside";

interface indexProps {
	children: React.ReactNode;
	items?: Item[];
	position: Position;
}

const DropdownRoot: FC<indexProps> = ({ children, items, position }) => {
	const dropdownRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [_items, setItems] = useState<Item[]>(items || []);
	const [_position, setPosition] = useState<Position>(position);

	const toggleDropdown = () => {
		console.log("toggled");
		setIsOpen((prev) => !prev);
	};

	return (
		<DropdownProvider
			value={{
				isOpen,
				items: _items,
				position: _position,
				dropdownRef,
				setIsOpen,
				toggleDropdown,
				setItems,
				setPosition,
				useClickOutside: (handler) => useClickOutside(handler, dropdownRef),
			}}
		>
			<motion.div className="relative" initial={false} animate={isOpen ? "open" : "closed"} ref={dropdownRef}>
				{children}
			</motion.div>
		</DropdownProvider>
	);
};

export default DropdownRoot;
