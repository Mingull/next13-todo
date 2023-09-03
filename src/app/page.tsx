"use client";

import { H1, H2, H3, H4, H5, H6, P } from "@/components/UI";
import { useSession } from "next-auth/react";

export default function Home() {
	const { data: session } = useSession();
	return (
		<div className="flex flex-col items-center justify-center w-full h-96 ">
			<H1>Hello</H1>
			<H2>Hello</H2>
			<H3>Hello</H3>
			<H4>Hello</H4>
			<H5>Hello</H5>
			<H6>Hello</H6>
			<P>Hello</P>
		</div>
	);
}
