import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, Session, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthRequiredError } from "./exceptions/Errors";
import { useState } from "react";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: getGoogleCredentials().clientId,
			clientSecret: getGoogleCredentials().clientSecret,
		}),
		GithubProvider({
			clientId: getGithubCredentials().clientId,
			clientSecret: getGithubCredentials().clientSecret,
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session({ token, session }) {
			if (token) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.role = token.role;
				session.user.image = token.picture;
			}

			return session;
		},
		async jwt({ token, user }) {
			const dbUser = await prisma.user.findFirst({ where: { email: token.email } });
			if (!dbUser) {
				token.id = user.id;
				return token;
			}
			return {
				id: dbUser.id,
				name: dbUser.name,
				role: dbUser.role,
				email: dbUser.email,
				picture: dbUser.image,
			};
		},
	},
};

function getGoogleCredentials(): { clientId: string; clientSecret: string } {
	const clientId = process.env.GOOGLE_CLIENT_ID;
	const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

	if (!clientId || clientId.length === 0) throw new Error("Missing GOOGLE_CLIENT_ID");

	if (!clientSecret || clientSecret.length === 0) throw new Error("Missing GOOGLE_CLIENT_SECRET");

	return { clientId, clientSecret };
}
function getGithubCredentials(): { clientId: string; clientSecret: string } {
	const clientId = process.env.GITHUB_CLIENT_ID;
	const clientSecret = process.env.GITHUB_CLIENT_SECRET;

	if (!clientId || clientId.length === 0) throw new Error("Missing GITHUB_CLIENT_ID");

	if (!clientSecret || clientSecret.length === 0) throw new Error("Missing GITHUB_CLIENT_SECRET");

	return { clientId, clientSecret };
}

type AuthorizedResponse = {
	status: "authorized";
	session: Session;
};

type LoadingResponse = {
	status: "loading";
	session: null;
};

type UnauthorizedResponse = {
	status: "unauthorized";
	session: null;
};

type SecureSession = (
	authOptions: NextAuthOptions,
	throwError?: boolean
) => Promise<AuthorizedResponse | LoadingResponse | UnauthorizedResponse>;

export const getSecureServerSession: SecureSession = async (authOptions, throwError) => {
	// Return a loading response while the promise is running
	const loadingResponse: LoadingResponse = { status: "loading", session: null };
	let session: Session | null = null;

	try {
		session = await getServerSession(authOptions);

		if (!session && throwError) throw new AuthRequiredError();

		if (!session) return { status: "unauthorized", session: null };

		return { status: "authorized", session };
	} catch (error) {
		// Handle any errors here
		// You can return an appropriate response if an error occurs
		// For example, you can return { status: "error", error: error.message }
		throw error; // Rethrow the error if needed
	} finally {
		// Ensure the loading status is not returned indefinitely
		if (session === null) {
			return loadingResponse;
		}
	}
};
