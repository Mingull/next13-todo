"use client";
import { useOnModalDismiss } from "@/lib/hooks";
import { FC, MouseEventHandler, useCallback, useEffect, useRef } from "react";

const ModalOverlay: FC<{ children: React.ReactNode }> = ({ children }) => {
	const overlay = useRef(null);
	const wrapper = useRef(null);

	const onDismiss = useOnModalDismiss();

	const onClick: MouseEventHandler = useCallback(
		(e) => {
			if (e.target === overlay.current || e.target === wrapper.current) {
				if (onDismiss) onDismiss();
			}
		},
		[onDismiss, overlay, wrapper]
	);

	const onKeyDown = useCallback(
		(e: KeyboardEvent) => {
			if (e.key === "Escape") onDismiss();
		},
		[onDismiss]
	);

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown);
		return () => document.removeEventListener("keydown", onKeyDown);
	}, [onKeyDown]);

	return (
		<div
			ref={overlay}
			className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full p-4 mx-auto overflow-x-hidden overflow-y-auto bg-black/60"
			onClick={onClick}
		>
			<div
				ref={wrapper}
				className="absolute w-full p-6 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 sm:w-10/12 md:w-8/12 lg:w-1/2"
			>
				{children}
			</div>
		</div>
	);
};
export default ModalOverlay;
