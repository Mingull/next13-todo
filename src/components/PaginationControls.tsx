"use client";
import { usePagination } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight, Currency } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, use, useEffect, useState } from "react";

interface PaginationControlsProps {
	url: string;
	totalItems: number;
	page?: string;
	perPage?: string;
}

const PaginationControls: FC<PaginationControlsProps> = ({ url = "/", totalItems, page, perPage }) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// const currentPage = Number((page || searchParams?.get("page")) ?? "1");
	const itemsPerPage = Number((perPage || searchParams?.get("per_page")) ?? "5");
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const { activePage, setPage, range } = usePagination({
		total: totalPages,
		onChange(page) {
			console.log(page);
		},
	});

	const start = (activePage - 1) * itemsPerPage;
	const end = start + itemsPerPage;

	const goToPage = (pageNumber: number) => {
		router.push(`${url}?page=${pageNumber}&per_page=${itemsPerPage}`);
		setPage(pageNumber);
		console.log(range);
	};

	return (
		<nav className="flex items-center justify-between px-2 pt-3 pb-2 bg-zinc-50 dark:bg-zinc-600">
			<span className="text-sm font-normal text-zinc-500 dark:text-zinc-400">
				Showing{" "}
				<span className="font-semibold text-zinc-900 dark:text-white">
					{start + 1}-{totalItems > end ? end : totalItems}
				</span>{" "}
				of <span className="font-semibold text-zinc-900 dark:text-white">{totalItems}</span>
			</span>
			<ul className="inline-flex h-8 -space-x-px text-sm">
				{activePage > 1 ? (
					<li>
						<button
							onClick={() => goToPage(1)}
							className="flex items-center justify-center h-8 px-3 ml-0 leading-tight bg-white border rounded-l-lg text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">First</span>
							<ChevronFirst />
						</button>
					</li>
				) : null}
				{activePage > 1 ? (
					<li>
						<button
							onClick={() => goToPage(activePage - 1)}
							className="flex items-center justify-center h-8 px-3 ml-0 leading-tight bg-white border text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeft />
						</button>
					</li>
				) : null}
				{range.map((pageNumber) => {
					if (pageNumber !== "dots")
						return (
							<li key={pageNumber}>
								<button
									onClick={() => goToPage(pageNumber)}
									className={cn(
										"flex items-center justify-center h-8 px-3 text-blue-600 border border-zinc-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-700 dark:text-white",
										{
											"bg-blue-500 dark:bg-zinc-600": pageNumber === activePage,
											"rounded-l-lg": pageNumber === 1,
											"rounded-r-lg": pageNumber === totalPages,
											"rounded-r-none": pageNumber !== 1 && pageNumber !== activePage,
											"rounded-l-none": pageNumber !== totalPages && pageNumber !== activePage,
										}
									)}
								>
									{pageNumber}
								</button>
							</li>
						);
					else return <></>;
				})}

				{activePage < totalPages ? (
					<li>
						<button
							onClick={() => goToPage(activePage + 1)}
							className="flex items-center justify-center h-8 px-3 leading-tight bg-white border text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<ChevronRight />
						</button>
					</li>
				) : null}
				{activePage < totalPages ? (
					<li>
						<button
							onClick={() => goToPage(totalPages)}
							className="flex items-center justify-center h-8 px-3 leading-tight bg-white border rounded-r-lg text-zinc-500 border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700 dark:bg-zinc-800 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-white"
						>
							<span className="sr-only">Next</span>
							<ChevronLast />
						</button>
					</li>
				) : null}
			</ul>
		</nav>
	);
};

export default PaginationControls;
