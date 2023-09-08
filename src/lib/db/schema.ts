import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";
import { boolean, int, mysqlEnum, mysqlTable, primaryKey, timestamp, varchar } from "drizzle-orm/mysql-core";

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

export const passwords = mysqlTable("passwords", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	string: varchar("string", { length: 255 }).notNull(),
	serviceId: varchar("service_id", { length: 255 })
		.notNull()
		.references(() => services.id, { onDelete: "cascade", onUpdate: "cascade" }),
	createdAt: timestamp("created_at", { mode: "date", fsp: 3 }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: "date", fsp: 3 }).defaultNow().onUpdateNow(),
});

export const passwordsRelations = relations(passwords, ({ one }) => ({
	user: one(users, {
		fields: [passwords.userId],
		references: [users.id],
	}),
	service: one(services, {
		fields: [passwords.serviceId],
		references: [services.id],
	}),
}));

export const services = mysqlTable("services", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
});

export const servicesRelations = relations(services, ({ many }) => ({
	passwords: many(passwords),
}));

export const users = mysqlTable("users", {
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

export const accounts = mysqlTable(
	"accounts",
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

export const sessions = mysqlTable("sessions", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	sessionToken: varchar("session_token", { length: 255 }).notNull().primaryKey(),
	userId: varchar("user_id", { length: 255 })
		.notNull()
		.references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
	expires: timestamp("expires", { mode: "date" }).notNull(),
});

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
