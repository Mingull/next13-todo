export type ServerDispatch<A> = (value: A) => void;
export type SetServerStateAction<S> = S | ((prevState: S) => S);
export const createServerState = <S>(initialValue: S | (() => S)): [S, ServerDispatch<SetServerStateAction<S>>] => {
	let stateValue: S = typeof initialValue === "function" ? (initialValue as () => S)() : initialValue;

	const setValue: ServerDispatch<SetServerStateAction<S>> = (value: S | ((prevState: S) => S)) => {
		if (typeof value === "function") {
			console.log((value as (prev: S) => S)(stateValue));
			stateValue = (value as (prevState: S) => S)(stateValue);
		} else {
			console.log((value as (prev: S) => S)(stateValue));
			stateValue = value;
		}
	};
	console.log({ stateValue });

	return [stateValue, setValue];
};

export default createServerState;
