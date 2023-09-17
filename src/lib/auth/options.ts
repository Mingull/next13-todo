import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { MySqlSchema } from "drizzle-orm/mysql-core";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { db } from "../db";
import { users } from "../db/schema";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions: NextAuthOptions = {
	adapter: DrizzleAdapter(db),
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
			const dbUser = await db
				.select()
				.from(users)
				.where(eq(users.email, token.email as string))
				.then((res) => res[0]);

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
