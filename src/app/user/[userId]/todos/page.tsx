import PaginationControls from "@/components/PaginationControls";
import { prisma } from "@/db";
import { authOptions } from "@/lib/auth/options";
import { AuthRequiredError, UserNotFoundError } from "@/lib/exceptions/Errors";
import { Todo, User } from "@prisma/client";
import { getServerSession } from "next-auth";

const Todos = async ({
	params,
	searchParams,
}: {
	params: { userId: string };
	searchParams: { [key: string]: string | string[] | undefined };
}) => {
	const page = searchParams["page"] ?? "1";
	const perPage = searchParams["per_page"] ?? "5";

	const start = (Number(page) - 1) * Number(perPage);
	const end = start + Number(perPage);

	const user: ({ todos: Todo[] } & User) | null = await prisma.user.findFirst({
		where: { id: params.userId },
		include: { todos: true },
	});
	if (!user) throw new UserNotFoundError();
	const slicedTodos = user.todos.slice(start, end);
	return (
		<div>
			<div>
				<h2>{user.name} Todo&apos;s</h2>
			</div>
			<div className="p-4 sm:rounded-lg bg-zinc-700">
				<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
					<table className="w-full text-sm text-left text-zinc-500 dark:text-zinc-400">
						<thead className="text-xs uppercase text-zinc-700 bg-zinc-50 dark:bg-zinc-600 dark:text-zinc-400">
							<tr>
								<th scope="col" className="px-6 py-3">
									Title
								</th>
								<th scope="col" className="p-4">
									Completed
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
							{slicedTodos.map((todo) => (
								<tr
									key={todo.id}
									className="bg-white border-b dark:bg-zinc-800 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900"
								>
									<th
										scope="row"
										className="px-6 py-4 font-medium text-zinc-900 whitespace-nowrap dark:text-white"
									>
										{todo.title}
									</th>
									<td className="w-4 p-4">
										<div className="flex items-center">
											<input
												id="checkbox-table-search-1"
												type="checkbox"
												checked={todo.complete}
												readOnly
												className="w-4 h-4 text-blue-600 rounded bg-zinc-100 border-zinc-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-zinc-800 dark:focus:ring-offset-zinc-800 focus:ring-2 dark:bg-zinc-700 dark:border-zinc-600"
											/>
											<label htmlFor="checkbox-table-search-1" className="sr-only">
												checkbox
											</label>
										</div>
									</td>
									<td className="px-3 py-4">
										{todo.createdAt.toLocaleTimeString()} {todo.createdAt.toLocaleDateString()}
									</td>
									<td className="px-3 py-4">
										{todo.updatedAt.toLocaleTimeString()} {todo.updatedAt.toLocaleDateString()}
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<PaginationControls url="/profile" totalItems={user.todos.length} />
				</div>
			</div>
		</div>
	);
};

export default Todos;
