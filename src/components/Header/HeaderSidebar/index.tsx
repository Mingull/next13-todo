"use client";
import { FC, useEffect } from "react";
import Hamburger from "./Hamburger";
import Sidebar from "@/components/Sidebar";
import { User } from "next-auth";

interface indexProps {
	user?: User;
}

const HeaderSidebar: FC<indexProps> = ({ user }) => {
	useEffect(() => {}, []);
	return (
		<Sidebar user={user}>
			<Hamburger />
		</Sidebar>
	);
};

export default HeaderSidebar;
