import createSafeContext from "@/lib/utils/createSafeContext";
import { Item } from ".";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Position } from "./Dropdown";

interface DropdownContext {
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	toggleDropdown(): void;
	items: Item[];
	setItems: Dispatch<SetStateAction<Item[]>>;
	position: Position;
	setPosition: Dispatch<SetStateAction<Position>>;
	dropdownRef: MutableRefObject<HTMLDivElement | null>;
	useClickOutside: (handler: () => void) => void;
}

export const [DropdownProvider, useDropdown] = createSafeContext<DropdownContext>(
	"Dropdown.Root component was not found in the component tree"
);
