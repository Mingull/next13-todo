"use server";
import { prisma } from "@/prisma_db";
import { error } from "console";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { AuthRequiredError } from "../exceptions/Errors";

const createTodo = async (data: FormData, session: Session | null) => {
	try {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		const title = data.get("title")?.valueOf();

		if (typeof title !== "string" || title.length === 0) throw new Error("Invalid title");

		if (!session) throw new AuthRequiredError();

		await prisma.todo.create({ data: { title, completed: false, userId: session.user.id } });
	} catch (error) {
		return {
			error,
		};
	}
};
export default createTodo;
