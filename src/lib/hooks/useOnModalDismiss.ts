import { useRouter } from "next/navigation";
import { useCallback } from "react";

const useOnModalDismiss = () => {
	const router = useRouter();
	const onDismiss = useCallback(() => {
		router.back();
	}, [router]);
	return onDismiss;
};
export default useOnModalDismiss;
