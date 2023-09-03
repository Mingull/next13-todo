"use client";
import { Enums } from "@/lib/types/Enums";
import { FC } from "react";
import { H1 } from "./UI";

interface TitleProps {
	title: string;
}

const Title: FC<TitleProps> = ({ title }) => {
	return (
		<H1 font={"baloo thambi"} size={"2xl"} className={`text-zinc-600  dark:text-zinc-300`}>
			{title}
		</H1>
	);
};

export default Title;
