import { useLocalStorage } from "@/lib/hooks";
import createSafeContext from "@/lib/utils/createSafeContext";
import { Dispatch, MutableRefObject, SetStateAction } from "react";

interface SidebarContext {
	isOpen: boolean;
	sidebarRef: MutableRefObject<HTMLDivElement | null>;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	toggleSidebar(): void;
	useClickOutside: (handler: () => void) => void;
	settings: (set?: string | ((prevState: string) => string) | undefined) => string | undefined;
}

export const [SidebarProvider, useSidebar] = createSafeContext<SidebarContext>(
	"Sidebar.Root component was not found in the component tree"
);
