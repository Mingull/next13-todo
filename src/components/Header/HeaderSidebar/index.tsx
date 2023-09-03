"use client";
import { FC } from "react";
import Hamburger from "./Hamburger";
import Sidebar from "@/components/Sidebar";
import { User } from "next-auth";

interface indexProps {
	user?: User;
}

const HeaderSidebar: FC<indexProps> = ({ user }) => {
	return (
		<Sidebar user={user}>
			<Hamburger />
		</Sidebar>
	);
};

export default HeaderSidebar;
