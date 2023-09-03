export default async function Loading() {
	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="p-4 sm:rounded-lg bg-zinc-700">
			<div
				role="status"
				className="max-w-md p-4 space-y-4 border divide-y rounded shadow border-zinc-200 divide-zinc-200 animate-pulse dark:divide-zinc-600 md:p-6 dark:border-zinc-600"
			>
				<div className="flex items-center justify-between">
					<div>
						<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
						<div className="w-32 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
					</div>
					<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
				</div>
				<div className="flex items-center justify-between pt-4">
					<div>
						<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
						<div className="w-32 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
					</div>
					<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
				</div>
				<div className="flex items-center justify-between pt-4">
					<div>
						<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
						<div className="w-32 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
					</div>
					<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
				</div>
				<div className="flex items-center justify-between pt-4">
					<div>
						<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
						<div className="w-32 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
					</div>
					<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
				</div>
				<div className="flex items-center justify-between pt-4">
					<div>
						<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-600 w-24 mb-2.5"></div>
						<div className="w-32 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
					</div>
					<div className="h-2.5 bg-zinc-300 rounded-full dark:bg-zinc-700 w-12"></div>
				</div>
				<span className="sr-only">Loading...</span>
			</div>
		</div>
	);
}
