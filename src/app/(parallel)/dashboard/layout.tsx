import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Dashboard",
};

export default function DashboardLayout({
	children,
	todos,
	passwords,
}: {
	children: React.ReactNode;
	todos: React.ReactNode;
	passwords: React.ReactNode;
}) {
	return (
		<div className="container grid grid-cols-10 mx-auto gap-x-5">
			{children}
			{todos}
			{passwords}
		</div>
	);
}
