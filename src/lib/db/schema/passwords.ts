import { relations } from "drizzle-orm";
import { mysqlTable, varchar, timestamp } from "drizzle-orm/mysql-core";
import { services } from "./services";
import { users } from "./users";

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

export type Password = typeof passwords.$inferSelect; // return type when queried
export type NewPassword = typeof passwords.$inferInsert; // insert type
