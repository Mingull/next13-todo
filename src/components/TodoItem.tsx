"use client";
import { Session } from "next-auth";
import { FC } from "react";
import { toast } from "react-hot-toast";

type TodoItemProps = {
	id: string;
	title: string;
	complete: boolean;
	session: Session | null;
};

const TodoItem: FC<TodoItemProps> = ({ id, title, complete, session }) => {
	if (!session) {
		toast.error("No session");
	}
	return (
		<li className="flex items-center gap-1">
			<input id={id} type="checkbox" className="cursor-pointer peer" />
			<label htmlFor={id} className="cursor-pointer peer-checked:line-through peer-checked:text-zinc-500">
				{title}
			</label>
		</li>
	);
};
export default TodoItem;
