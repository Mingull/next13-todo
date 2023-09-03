import createSafeContext from "@/lib/utils/createSafeContext";

interface DropdownContext {}

export const [PaginationProvider, usePagination] = createSafeContext<DropdownContext>(
	"Pagination.Root component was not found in the component tree"
);
