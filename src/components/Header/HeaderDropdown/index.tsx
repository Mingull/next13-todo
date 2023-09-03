"use client";
import Dropdown, { Item } from "@/components/Dropdown";
import { User } from "next-auth";
import { FC } from "react";
import HeaderButton from "./Button";

interface indexProps {
	items: Item[];
	user: User;
}

const index: FC<indexProps> = ({ items, user }) => {
	return (
		<Dropdown
			items={items}
			position="bottom"
			header={
				<>
					<div className="font-medium">{user.name}</div>
					<div className="truncate">{user.email}</div>
				</>
			}
			footer={
				<a
					href="#"
					className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
				>
					Sign out
				</a>
			}
			children={<HeaderButton user={user} />}
		/>
	);
};

export default index;
