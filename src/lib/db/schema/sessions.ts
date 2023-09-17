import { relations } from "drizzle-orm";
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}));

export type SessionDB = typeof sessions.$inferSelect; // return type when queried
export type NewSession = typeof sessions.$inferInsert; // insert type
