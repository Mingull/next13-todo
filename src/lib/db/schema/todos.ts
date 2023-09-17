import { mysqlTable, varchar, timestamp, boolean } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const todos = mysqlTable("todos", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	title: varchar("title", { length: 255 }).notNull(),
	completed: boolean("completed").notNull(),
	createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 }).defaultNow().onUpdateNow(),
});

export const todosRelations = relations(todos, ({ one }) => ({
	user: one(users, {
		fields: [todos.userId],
		references: [users.id],
	}),
}));

export type Todo = typeof todos.$inferSelect; // return type when queried
export type NewTodo = typeof todos.$inferInsert; // insert type
