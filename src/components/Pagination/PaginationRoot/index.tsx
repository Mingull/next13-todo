"use client";
import { FC } from "react";
import { PaginationProvider } from "../Pagination.context";

interface indexProps {
	children: React.ReactNode;
}

const DropdownRoot: FC<indexProps> = ({ children }) => {
	return <PaginationProvider value={{}}>{children}</PaginationProvider>;
};

export default DropdownRoot;
