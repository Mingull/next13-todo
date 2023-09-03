"use client";
import { usePagination } from "@/lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import PaginationControl from "./PaginationControl";
import PaginationRoot from "./PaginationRoot";
import PaginationTotal from "./PaginationTotal";
import PaginationWrapper from "./PaginationWrapper";

export interface DropdownProps {
	url: string;
	totalItems: number;
	page?: string;
	perPage?: string;
	hasShowTotal?: boolean;
	position: PaginationPosition;
}

export type PaginationPosition = "left" | "right";

const Pagination = ({ hasShowTotal, url = "/", totalItems, page, perPage }: DropdownProps) => {
	const router = useRouter();
	const searchParams = useSearchParams();

	// const currentPage = Number((page || searchParams?.get("page")) ?? "1");
	const itemsPerPage = Number((perPage || searchParams?.get("per_page")) ?? "5");
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const { activePage, setPage, range } = usePagination({
		total: totalPages,
	});

	const start = (activePage - 1) * itemsPerPage;
	const end = start + itemsPerPage;

	const goToPage = (pageNumber: number) => {
		router.push(`${url}?page=${pageNumber}&per_page=${itemsPerPage}`);
		setPage(pageNumber);
		console.log(range);
	};
	return (
		<PaginationRoot>
			<PaginationWrapper id="dropdownInformation">
				{hasShowTotal ? <PaginationTotal total={totalItems} start={start} end={end} /> : null}
				<PaginationControl activePage={activePage} goToPage={goToPage} range={range} totalPages={totalPages} />
			</PaginationWrapper>
		</PaginationRoot>
	);
};

Pagination.displayName = "DropdownBase";
Pagination.Root = PaginationRoot;
Pagination.Wrapper = PaginationWrapper;

export default Pagination;
