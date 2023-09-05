import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { AuthRequiredError } from "../exceptions/Errors";

// Import createServerState and createServerEffect functions and types
import { createServerState, createServerEffect } from "../utils";

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
	// Use createServerState to manage server-side state
	const [session, setSession] = createServerState<Session | null>(null);

	// Use createServerEffect for side effects on the server
	createServerEffect(() => {
		// Start a timer to check for completion after a certain period
		const timeoutPromise = new Promise<null>((resolve) => {
			setTimeout(() => resolve(null), 5000); // Adjust the timeout as needed
		});

		async function fetchSession() {
			try {
				// Try to get the session
				if (session === null) {
					const fetchedSession = await Promise.race([getServerSession(authOptions), timeoutPromise]);
					setSession(fetchedSession); // Update the server-side state with the retrieved session
				}

				if (!session && throwError) {
					throw new AuthRequiredError();
				}
			} catch (error) {
				console.error("Error in getSecureServerSession:", error);
				// You can handle the error here or rethrow it as needed
			}
		}

		fetchSession(); // Call the async function
	}, [session]);
	
	if (!session) {
		return { status: "unauthorized", session: null };
	} else {
		return { status: "authorized", session };
	}
};
