import { Baloo_Thambi_2, Open_Sans, Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({ subsets: ["latin"], weight: ["100", "300", "400", "500", "700"], display: "swap" });
const openSans = Open_Sans({ subsets: ["latin"], display: "swap" });
const balooThambi = Baloo_Thambi_2({ subsets: ["latin"], display: "swap" });

export namespace Enums {
	export const Fonts = {
		ROBOTO: roboto,
		OPENSANS: openSans,
		BALOOTHAMBI: balooThambi,
	};

	export type Fonts = keyof typeof Fonts;
}
