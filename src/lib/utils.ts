import { ClassValue, clsx } from "clsx";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function range(start: number, end: number) {
	const length = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
}

export function capitalize(word: string): string {
	return word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : word;
}

export function multiCapitalize(...words: string[]): string[];
export function multiCapitalize(words: string[]): string[];
export function multiCapitalize(...args: any[]): string[] {
	if (args.length === 1 && Array.isArray(args[0])) {
		const words = args[0] as string[];
		return words.map((word) => capitalize(word));
	} else {
		return args.map((word) => capitalize(word));
	}
}

export function splitWord(word: string, index: number): [string, string] | null {
	return index >= 0 && index < word.length ? [word.substring(0, index), word.substring(index)] : null;
}

export type ServerDispatch<A> = (value: A) => void;
export type SetServerStateAction<S> = S | ((prevState: S) => S);
export const createServerState = <S>(initialValue: S | (() => S)): [S, ServerDispatch<SetServerStateAction<S>>] => {
	let stateValue: S = typeof initialValue === "function" ? (initialValue as () => S)() : initialValue;

	const setValue: ServerDispatch<SetServerStateAction<S>> = (value: S | ((prevState: S) => S)) => {
		if (typeof value === "function") stateValue = (value as (prevState: S) => S)(stateValue);
		else stateValue = value;
	};

	return [stateValue, setValue];
};
useEffect;
const UNDEFINED_VOID_ONLY = Symbol();
type Destructor = () => void;
type DependencyList = ReadonlyArray<unknown>;

type ServerEffectCallback = () => void | Destructor;
type ServerEffect = (effect: ServerEffectCallback, deps?: DependencyList) => void;

export const createServerEffect: ServerEffect = (effect, deps) => {
	let cleanup: void | Destructor;

	const cleanupEffect = () => {
		if (cleanup) {
			cleanup();
		}
	};

	const runEffect = () => {
		cleanupEffect(); // Clean up the previous effect

		cleanup = effect(); // Execute the new effect and store the cleanup function

		if (cleanup && typeof cleanup !== "function") {
			delete cleanup[UNDEFINED_VOID_ONLY];
		}
	};

	if (!deps) {
		runEffect(); // Run the effect without dependencies
	} else {
		const depValues = deps.map((dep) => ({ value: dep }));
		const checkDeps = () => {
			for (let i = 0; i < depValues.length; i++) {
				if (depValues[i].value !== deps[i]) {
					return true;
				}
			}
			return false;
		};

		const updateEffectIfChanged = () => {
			if (checkDeps()) {
				runEffect();
				depValues.forEach((dep, i) => {
					dep.value = deps[i];
				});
			}
		};

		updateEffectIfChanged(); // Initial run

		// Subscribe to dependency changes
		const unsubscribe = () => {
			cleanupEffect();
			depValues.length = 0; // Clear the dependency values
		};

		return unsubscribe;
	}
};
