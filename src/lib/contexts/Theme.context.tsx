"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import createSafeContext from "../utils/createSafeContext";

export type Theme = "light" | "dark";
interface ThemeCtx {
	theme: Theme;
	setTheme: Dispatch<SetStateAction<Theme>>;
}

const [Provider, useTheme] = createSafeContext<ThemeCtx | null>("useTheme() must be used within a ThemeProvider");

const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [theme, setTheme] = useState<Theme>("dark");

	return <Provider value={{ theme, setTheme }}>{children}</Provider>;
};

export default ThemeProvider;
export { useTheme };
