import { mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

export const verificationTokens = mysqlTable(
	"verification_tokens",
	{
		id: varchar("id", { length: 255 }).notNull().primaryKey(),
		identifier: varchar("identifier", { length: 255 }).notNull(),
		token: varchar("token", { length: 255 }).notNull(),
		expires: timestamp("expires", { mode: "date" }).notNull(),
	},
	(vt) => ({
		compoundKey: primaryKey(vt.identifier, vt.token),
	})
);

export type VerificationToken = typeof verificationTokens.$inferSelect; // return type when queried
export type NewVerificationToken = typeof verificationTokens.$inferInsert; // insert type
