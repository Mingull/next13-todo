"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { Toaster } from "react-hot-toast";
import TRPCProvider from "@/app/_trpc/Provider";

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<TRPCProvider>
			<SessionProvider>
				<Toaster position="top-center" reverseOrder={false} />
				{children}
			</SessionProvider>
		</TRPCProvider>
	);
};
export default Providers;
