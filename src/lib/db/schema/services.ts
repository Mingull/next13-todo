import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { passwords } from "./passwords";

export const services = mysqlTable("services", {
	id: varchar("id", { length: 255 }).notNull().primaryKey(),
	name: varchar("name", { length: 255 }),
});

export const servicesRelations = relations(services, ({ many }) => ({
	passwords: many(passwords),
}));

export type Service = typeof services.$inferSelect; // return type when queried
export type NewService = typeof services.$inferInsert; // insert type
