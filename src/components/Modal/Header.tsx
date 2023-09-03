"use client";
import { useOnModalDismiss } from "@/lib/hooks";
import { FC } from "react";

export interface HeaderProps {
	children: React.ReactNode;
}

const Header: FC<HeaderProps> = ({ children }) => {
	const onDismiss = useOnModalDismiss();
	return (
		<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
			{children}
			<button
				type="button"
				className="inline-flex items-center justify-center w-8 h-8 ml-auto text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
				data-modal-hide="defaultModal"
				onClick={onDismiss}
			>
				<svg
					className="w-3 h-3"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 14"
				>
					<path
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
						d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
					/>
				</svg>
				<span className="sr-only">Close modal</span>
			</button>
		</div>
	);
};

export default Header;
