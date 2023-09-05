import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { AuthRequiredError } from "../exceptions/Errors";

// // Import createServerState and createServerEffect functions and types
import { createServerEffect, createServerState } from "../utils";

type AuthorizedResponse = {
	status: "authorized";
	session: Session;
};

type LoadingResponse = {
	status: "loading";
	session: null;
};

type ErrorResponse = {
	status: "error";
	session: null;
	message: string;
};

type UnauthorizedResponse = {
	status: "unauthorized";
	session: null;
};

type SecureSession = (
	authOptions: NextAuthOptions,
	throwError?: boolean
) => Promise<AuthorizedResponse | LoadingResponse | ErrorResponse | UnauthorizedResponse>;

export const getSecureServerSession: SecureSession = async (authOptions, throwError) => {
	// const [session, setSession] = createServerState<Session | null>(null);
	// const [isLoading, setLoading] = createServerState<boolean>(true);
	// const [errorMessage, setErrorMessage] = createServerState<string | undefined>(undefined);
	// const [response, setResponse] = createServerState<
	// 	AuthorizedResponse | UnauthorizedResponse | LoadingResponse | ErrorResponse
	// >({ status: "loading", session: null });

	// 	const fetchSessionAsync = async () => {
	// 		if (isLoading) {
	// 			const timeoutPromise = new Promise<null>((resolve) => {
	// 				setTimeout(() => resolve(null), 5000); // Adjust the timeout as needed
	// 			});

	// 			try {
	// 				if (session === null) {
	// 					const fetchedSession = await Promise.race([getServerSession(authOptions), timeoutPromise]);
	// 					setSession(fetchedSession);
	// 				}

	// 				if (session && !throwError) {
	// 					throw new AuthRequiredError();
	// 				}
	// 			} catch (error: any) {
	// 				console.error("Error in getSecureServerSession:", error);
	// 				setErrorMessage(error.message || "An error occurred.");
	// 			} finally {
	// 				setLoading((prev) => !prev);
	// 			}
	// 		}
	// 	};

	// 	createServerEffect(() => {
	// 		fetchSessionAsync(); // Call the async function
	// 		if (isLoading && !session) {
	// 			setResponse({ status: "loading", session: null });
	// 		} else if (!session && errorMessage) {
	// 			setResponse({ status: "error", session: null, message: errorMessage });
	// 		} else if (!session) {
	// 			setResponse({ status: "unauthorized", session: null });
	// 		} else {
	// 			setResponse({ status: "authorized", session });
	// 		}
	// 		console.log({ response });
	// 	}, [session, isLoading, errorMessage]);

	return { status: "loading", session: null };
};

const [session, setSession] = createServerState<Session | null>(null);

setSession((prev) => (!prev ? { expires: "1", user: { id: "1", role: "ADMIN" } } : prev));

createServerEffect(() => {
	console.log({ session });
}, [session]);
