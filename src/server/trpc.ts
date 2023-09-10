import { authOptions } from "@/lib/auth/options";
import { TRPCError, initTRPC } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth/next";
import superjson from "superjson";

const t = initTRPC.create();

export const router = t.router;

export const middleware = t.middleware;

const isAuth = middleware(async ({ ctx, next }) => {
	const session = await currentSession();

	if (!session) throw new TRPCError({ code: "UNAUTHORIZED" });

	return next({
		ctx: {
			user: session.user,
		},
	});
});
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);

const currentSession = async () => {
	return await getServerSession(authOptions);
};
