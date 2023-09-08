import type { User } from "next-auth";
import { users } from "../db/schema";

type UserId = string;
declare module "next-auth/jwt" {
	interface JWT {
		id: UserId;
		role: users.role;
	}
}

declare module "next-auth" {
	interface Session {
		user: User & {
			id: UserId;
			role: UserRole;
		};
	}
}
