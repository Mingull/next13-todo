export function splitWord(word: string, index: number): [string, string] | null {
	return index >= 0 && index < word.length ? [word.substring(0, index), word.substring(index)] : null;
}

export default splitWord;
