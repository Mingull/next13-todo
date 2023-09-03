"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { createTodo } from "@/lib/server/";
import toast from "react-hot-toast";

export default function Home() {
	const { data: session } = useSession();
	const action = async (formData: FormData) => {
		await toast.promise(createTodo(formData, session), {
			error: (error) => {
				console.log(error);
				return error;
			},
			success: "Todo created",
			loading: "loading...",
		});
	};
	return (
		<div className="container mx-auto">
			<header className="flex items-center justify-between mb-4">
				<h1 className="text-2xl">New</h1>
			</header>

			<form action={action} className="flex flex-col gap-2">
				<input
					type="text"
					name="title"
					className="px-2 py-1 bg-transparent border rounded outline-none border-zinc-300 focus-within:border-zinc-100"
				/>
				<div className="flex justify-end gap-3">
					<Link
						href=".."
						className="px-2 py-1 border rounded outline-none border-zinc-300 text-zinc-300 hover:bg-zinc-700 focus-within:bg-zinc-700"
					>
						Cancel
					</Link>
					<button
						type="submit"
						className="px-2 py-1 border rounded outline-none border-zinc-300 text-zinc-300 hover:bg-zinc-700 focus-within:bg-zinc-700"
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
}
