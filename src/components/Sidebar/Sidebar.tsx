"use client";
import { LayoutGrid, PieChart, ShoppingCart, UserIcon, X } from "lucide-react";
import { useSidebar } from "./Sidebar.context";
import SidebarRoot from "./SidebarRoot";
import SidebarWrapper, { sidebarWrapperVariants } from "./SidebarWrapper";
import SidebarHeader from "./SidebarHeader";
import SidebarBody, { sidebarBodyVariants } from "./SidebarBody";
import SidebarItemGroup from "./SidebarItemGroup";
import SidebarItem from "./SidebarItem";
import Title from "../Title";
import SidebarMulti from "./SidebarMulti";
import SidebarMultiGroup from "./SidebarMultiGroup";
import SidebarFooter from "./SidebarFooter";
import Image from "next/image";
import { User } from "next-auth";

interface SidebarProps {
	children: React.ReactNode;
	user?: User;
}

const Sidebar = ({ children, user }: SidebarProps) => {
	// const { setIsOpen } = useSidebar();
	return (
		<SidebarRoot>
			{children}
			<SidebarWrapper>
				<SidebarHeader>
					<Title title={"SecureInfo"} />
				</SidebarHeader>
				<SidebarBody>
					<SidebarItemGroup>
						<SidebarItem title="Dashboard" icon={<PieChart />} />
						<SidebarItem
							title="Profile"
							icon={<UserIcon />}
							pill={{
								value: "Pro",
							}}
						/>
						<SidebarMulti icon={<ShoppingCart />} title="E-commerce">
							<SidebarMultiGroup>
								<SidebarItem title="Products" className="pl-11" />
								<SidebarItem title="Billing" className="pl-11" />
								<SidebarItem title="Invoice" className="pl-11" />
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Products
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Billing
									</a>
								</li>
								<li>
									<a
										href="#"
										className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
									>
										Invoice
									</a>
								</li>
							</SidebarMultiGroup>
						</SidebarMulti>
					</SidebarItemGroup>
					<SidebarItemGroup>
						<SidebarItem
							icon={
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z" />
								</svg>
							}
							title="Inbox"
							pill={{
								value: "3",
							}}
						/>
						<SidebarItem
							icon={
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 18"
								>
									<path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
								</svg>
							}
							title="Users"
						/>
						<SidebarItem
							icon={
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 18 20"
								>
									<path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z" />
								</svg>
							}
							title="Products"
						/>
						<SidebarItem
							icon={
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 18 16"
								>
									<path
										stroke="currentColor"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
									/>
								</svg>
							}
							title="Sign in"
						/>
						<SidebarItem
							icon={
								<svg
									className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
									aria-hidden="true"
									xmlns="http://www.w3.org/2000/svg"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
									<path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
									<path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
								</svg>
							}
							title="Sign Up"
						/>
					</SidebarItemGroup>
				</SidebarBody>
				{user ? (
					<SidebarFooter>
						<Image src={user?.image || ""} alt={user.name || ""} />
					</SidebarFooter>
				) : null}
			</SidebarWrapper>
		</SidebarRoot>
	);
};

Sidebar.Root = SidebarRoot;
Sidebar.Wrapper = SidebarWrapper;
Sidebar.Header = SidebarHeader;
Sidebar.Body = SidebarBody;
Sidebar.Footer = SidebarFooter;
Sidebar.Group = SidebarItemGroup;
Sidebar.Item = SidebarItem;
Sidebar.Multi = SidebarMulti;

export default Sidebar;
