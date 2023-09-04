import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { AuthRequiredError } from "../exceptions/Errors";
import { createServerState } from "../utils";

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
	message: string; // Add a message property to error response
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

	// Start a timer to check for completion after a certain period
	const timeoutPromise = new Promise<null>((resolve) => {
		setTimeout(() => resolve(null), 5000); // Adjust the timeout as needed
	});

	try {
		// Try to get the session
		if (session === null) {
			session = await Promise.race([getServerSession(authOptions), timeoutPromise]);
			setSession(session); // Update the server-side state with the retrieved session
		}

		if (!session && throwError) {
			throw new AuthRequiredError();
		}

		if (!session) {
			return { status: "unauthorized", session: null };
		} else {
			return { status: "authorized", session };
		}
	} catch (error) {
		console.error("Error in getSecureServerSession:", error);
		return { status: "error", message: "Something went wrong" };
	}
};
