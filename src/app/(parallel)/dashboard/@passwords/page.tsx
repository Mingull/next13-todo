import PaginationControls from "@/components/PaginationControls";
import { buttonVariants } from "@/components/Button";
import { prisma } from "@/db";
import { authOptions } from "@/lib/auth";
import { AuthRequiredError } from "@/lib/exceptions/Errors";
import { cn } from "@/lib/utils";
import { Password } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Passwords = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
	const session = await getServerSession(authOptions);
	if (!session) throw new AuthRequiredError();

	const page = searchParams["page"] ?? "1";
	const perPage = searchParams["per_page"] ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	const passwords: Password[] = await prisma.password.findMany({
		where: {
			userId: session.user.id,
		},
		orderBy: {
			createdAt: "asc",
		},
	});
	const slicedPasswords = passwords.slice(start, end);

	return slicedPasswords.length ? (
		<div className="flex-col w-full col-span-3 p-4 sm:rounded-lg bg-zinc-100 dark:bg-zinc-700">
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
					<thead className="text-xs uppercase text-zinc-700 bg-zinc-50 dark:bg-zinc-600 dark:text-zinc-400">
						<tr>
							<th scope="col" className="px-6 py-3">
								{"#"}
							</th>
							<th scope="col" className="p-4">
								Password
							</th>
							<th scope="col" className="px-3 py-3">
								Created At
							</th>
							<th scope="col" className="px-3 py-3">
								Updated At
							</th>
						</tr>
					</thead>
					<tbody>
						{slicedPasswords.map((password) => (
							<tr
								key={password.id}
								className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
							>
								<th
									scope="row"
									className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
								>
									{password.string}
								</th>
								{/* <td className="w-4 p-4">
									<div className="flex items-center">
										<input
											id="checkbox-table-search-1"
											type="checkbox"
											checked={password.complete}
											readOnly
											className="w-4 h-4 text-blue-600 rounded bg-zinc-100 border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
										/>
										<label htmlFor="checkbox-table-search-1" className="sr-only">
											checkbox
										</label>
									</div>
								</td> */}
								<td className="px-3 py-4">
									{password.createdAt.toLocaleTimeString()} {password.createdAt.toLocaleDateString()}
								</td>
								<td className="px-3 py-4">
									{password.updatedAt.toLocaleTimeString()} {password.updatedAt.toLocaleDateString()}
								</td>
							</tr>
						))}
					</tbody>
				</table>
				<PaginationControls url="/dashboard/profile" totalItems={passwords.length} />
			</div>
		</div>
	) : (
		<div className="flex flex-col w-full col-span-3 p-4 sm:rounded-lg bg-zinc-100 dark:bg-zinc-700">
			<div className="flex items-center justify-center w-full h-full border shadow-md dark:border-zinc-600 sm:rounded-lg bg-zinc-50 dark:bg-zinc-600">
				<div className="flex flex-col space-y-3">
					<p className="text-xl">You don&apos;t have any passwords saved</p>
					<Link href={"/passwords/new"} className={cn(buttonVariants({ variant: "creative" }))}>
						Add One
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Passwords;
