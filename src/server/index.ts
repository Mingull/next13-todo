import { db } from "@/lib/db";
import { todos } from "@/lib/db/schema/todos";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";

// migrate(db, { migrationsFolder: "/src/lib/db/migrations" });

export const appRouter = router({
	getTodos: publicProcedure.query(async () => {
		return await db.query.todos.findMany();
	}),
	getTodo: publicProcedure.input(z.string()).query(
		async ({ input }) =>
			await db.query.todos.findFirst({
				where(fields, ops) {
					return ops.eq(fields.id, input);
				},
			})
	),
	addTodo: privateProcedure
		.input(
			z.object({
				title: z.string(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			await db.insert(todos).values({ id: "", title: input.title, userId: ctx.currentUser.id, completed: false });
			return true;
		}),
	updateTodo: privateProcedure
		.input(
			z.object({
				id: z.string(),
				title: z.string().optional(),
				completed: z.boolean().optional(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			await db
				.update(todos)
				.set({ id: input.id, title: input.title, userId: ctx.currentUser.id, completed: input.completed });
			return true;
		}),

	// deleteTodo: privateProcedure.input(z.string()).mutation(async ({ input, ctx }) => {
	// 	await db;
	// }),
});

export type AppRouter = typeof appRouter;
