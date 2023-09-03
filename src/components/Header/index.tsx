import { LayoutDashboard, Menu, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC } from "react";
import { Button } from "../Button/";
import { Item } from "../Dropdown";
import { useSidebar } from "../Sidebar/Sidebar.context";
import HeaderDropdown from "./HeaderDropdown";
import HeaderSidebar from "./HeaderSidebar";
import Title from "../Title";
import { getServerSession } from "next-auth";
import { authOptions, getSecureServerSession } from "@/lib/auth";

const Header = async () => {
	const session = await getSecureServerSession(authOptions);
	const items: Item[] = [
		{
			title: "Dashboard",
			href: "/dashboard",
			icon: <LayoutDashboard />,
		},
		{
			title: "Profile",
			href: "/dashboard/profile",
			icon: <UserIcon />,
		},
	];

	return (
		<div className="py-4 mb-5 shadow bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200">
			<div className="flex items-center justify-between ml-5 mr-10">
				<div className="flex items-center gap-x-12">
					<HeaderSidebar user={session.user} />
					<Link href={"/"}>
						<Title title="SecureInfo" />
					</Link>
					{/* {session && session.user && (
						<>
							<Button variant={"subtle"} href="/dashboard/todos">
								Your todos
							</Button>
							<Button variant={"subtle"} href="/dashboard/passwords">
								Your passwords
							</Button>
						</>
					)} */}
				</div>
				{session && session.user ? (
					<div>
						<HeaderDropdown items={items} user={session.user} />
					</div>
				) : (
					<div>
						<Button variant={"cta"} size={"cta"} href={"/api/auth/signin"}>
							Login
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
