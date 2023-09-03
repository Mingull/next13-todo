"use client";

import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import { Toaster } from "react-hot-toast";

const Providers: FC<{ children: React.ReactNode }> = ({ children }) => {
	return (
		<SessionProvider>
			<Toaster position="top-center" reverseOrder={false} />
			{children}
		</SessionProvider>
	);
};
export default Providers;
