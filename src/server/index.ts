import { db } from "@/lib/db";
import { todos } from "@/lib/db/schema";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";

// migrate(db, { migrationsFolder: "/src/lib/db/migrations" });

export const appRouter = router({
	getTodos: publicProcedure.query(async () => {
		return await db.select().from(todos);
	}),
	addTodo: privateProcedure
		.input(
			z.object({
				title: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			await db.insert(todos).values({ id: "", title: input.title, userId: ctx.user.id, completed: false });
			return true;
		}),
});

export type AppRouter = typeof appRouter;
