import { useEffect } from "react";

const useWindowEvent = <K extends string = keyof WindowEventMap>(
	type: K,
	listener: K extends keyof WindowEventMap
		? (this: Window, ev: WindowEventMap[K]) => void
		: (this: Window, ev: CustomEvent) => void,
	options?: boolean | AddEventListenerOptions
) => {
	useEffect(() => {
		window.addEventListener(type, listener as unknown as EventListener, options);
		return () => window.removeEventListener(type, listener as unknown as EventListener, options);
	}, [type, listener, options]);
};

export default useWindowEvent;
