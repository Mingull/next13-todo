import { MutableRefObject, useEffect, useRef } from "react";

const useClickOutside = (handler: () => void, initialRef?: MutableRefObject<HTMLDivElement | null>) => {
	const ref = initialRef || useRef<HTMLDivElement | null>();

	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (!ref.current?.contains(e.target as Node)) {
				handler();
			}
		};

		document.addEventListener("mousedown", listener);

		return () => {
			document.removeEventListener("mousedown", listener);
		};
	});

	return ref;
};

export default useClickOutside;
