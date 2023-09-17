import type { AdapterAccount } from "@auth/core/adapters";
import { int, mysqlTable, primaryKey, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users";
import { relations } from "drizzle-orm";

export const accounts = mysqlTable(
	"account",
	{
		id: varchar("id", { length: 255 }).notNull().primaryKey(),
		userId: varchar("user_id", { length: 255 })
			.notNull()
			.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
		type: varchar("type", { length: 255 }).$type<AdapterAccount["type"]>().notNull(),
		provider: varchar("provider", { length: 255 }).notNull(),
		providerAccountId: varchar("provider_account_id", { length: 255 }).notNull(),
		refreshToken: varchar("refresh_token", { length: 255 }),
		accessToken: varchar("access_token", { length: 255 }),
		expiresAt: int("expires_at"),
		tokenType: varchar("token_type", { length: 255 }),
		scope: varchar("scope", { length: 255 }),
		idToken: varchar("id_token", { length: 255 }),
		sessionState: varchar("session_state", { length: 255 }),
	},
	(account) => ({
		compoundKey: primaryKey(account.provider, account.providerAccountId),
	})
);

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export type Accounts = typeof accounts.$inferSelect; // return type when queried
export type NewAccounts = typeof accounts.$inferInsert; // insert type
