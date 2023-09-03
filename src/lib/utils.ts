import { ClassValue, clsx } from "clsx";
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
