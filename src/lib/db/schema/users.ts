import { relations } from "drizzle-orm";
import { mysqlEnum, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";
import { accounts } from "./accounts";
import { passwords } from "./passwords";
import { sessions } from "./sessions";
import { todos } from "./todos";

export const users = mysqlTable("user", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).unique(),
	emailVerified: timestamp("email_verified", {
		mode: "date",
		fsp: 3,
	}).defaultNow(),
	image: varchar("image", { length: 255 }),
	role: mysqlEnum("role", ["USER", "MODERATOR", "ADMIN", "SUPERADMIN"]).notNull().default("USER"),
});

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	sessions: many(sessions),
	todos: many(todos),
	passwords: many(passwords),
}));

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type
