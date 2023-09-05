import capitalize from "./capitalize";

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
export default multiCapitalize;
