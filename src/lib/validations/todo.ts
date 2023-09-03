import { z } from "zod";

export const todoValidator = z.object({
	title: z.string(),
	complete: z.boolean(),
	createdAt: z.date(),
	updatedAt: z.date(),
});
