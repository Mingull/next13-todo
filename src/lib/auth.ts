import { prisma } from "@/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { AuthRequiredError } from "./exceptions/Errors";

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

export const getSecureServerSession = async (authOptions: NextAuthOptions) => {
	const session = await getServerSession(authOptions);

	if (!session) throw new AuthRequiredError();

	return session;
};
