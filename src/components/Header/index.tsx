import { getSecureServerSession } from "@/lib/auth/functions";
import { authOptions } from "@/lib/auth/options";
import { LayoutDashboard, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../Button/";
import { Item } from "../Dropdown";
import Title from "../Title";
import HeaderDropdown from "./HeaderDropdown";
import HeaderSidebar from "./HeaderSidebar";

const Header = async () => {
	const { status, session } = await getSecureServerSession(authOptions);
	console.log(status);
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
					{status !== "loading" && status === "authorized" ? <HeaderSidebar user={session.user} /> : null}
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
				{status === "loading" ? (
					<>Loading...</>
				) : status === "authorized" ? (
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
