import { Button } from "@/components/Button";
import { authOptions } from "@/lib/auth/options";
import { AuthRequiredError } from "@/lib/exceptions/Errors";
import { capitalize, multiCapitalize, splitWord } from "@/lib/utils";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { FC } from "react";

const Page: FC = async () => {
	// await new Promise((resolve) => setTimeout(resolve, 500));
	const session = await getServerSession(authOptions);
	if (!session) throw new AuthRequiredError();
	// if (session.user.role !== "ADMIN") throw new AdminAccessError();

	return (
		<div className="col-span-4 p-4 sm:rounded-lg bg-zinc-100 dark:bg-zinc-700">
			<div className="items-center justify-center flex-auto w-full h-full p-4 border shadow-md dark:border-zinc-600 sm:rounded-lg bg-zinc-50 dark:bg-zinc-600">
				<h1 className="mb-4 text-3xl">User Status</h1>
				<div className="flex justify-between">
					<div className="">
						<p className="text-xl">
							Name:{" "}
							<span className="font-semibold text-zinc-900 dark:text-white">{session?.user?.name}</span>
						</p>
						<p className="text-xl">
							Role:{" "}
							<span className="font-semibold text-zinc-900 dark:text-white">
								{multiCapitalize(splitWord(session?.user?.role, 5)!).join(" ")}
							</span>
						</p>
					</div>
					<Image width={100} height={100} src={session?.user?.image!} alt={session?.user?.name!} />
				</div>
				<Button variant={"destructive"} href="/api/auth/signout?callbackUrl=/">
					Log out
				</Button>
			</div>
		</div>
	);
};

export default Page;
