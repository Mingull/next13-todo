import { authOptions } from "@/lib/auth/options";
import { AuthRequiredError } from "@/lib/exceptions/Errors";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FC } from "react";

const Page: FC = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 500));
	const session = await getServerSession(authOptions);
	if (!session) throw new AuthRequiredError();

	return (
		<div className="flex-col w-full p-4 shadow sm:rounded-lg bg-zinc-100 dark:bg-zinc-700">
			<h1 className="mb-4 text-3xl">User Status</h1>
			<div className="flex justify-between">
				<div className="">
					<p className="text-xl">
						Name: <span className="font-semibold text-zinc-900 dark:text-white">{session?.user?.name}</span>
					</p>
					<p className="text-xl">
						Role:{" "}
						<span className="font-semibold text-zinc-900 dark:text-white">
							{session?.user?.role === "ADMIN" ? "Admin" : "User"}
						</span>
					</p>
				</div>
				<Image width={100} height={100} src={session?.user?.image!} alt={session?.user?.name!} />
			</div>
			<Link href="/api/auth/signout?callbackUrl=/">Log out</Link>
		</div>
	);
};

export default Page;
