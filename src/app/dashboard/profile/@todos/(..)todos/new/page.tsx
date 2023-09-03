"use client";

import { Modal } from "@/components/Modal";
import { buttonVariants } from "@/components/UI";
import { useOnModalDismiss } from "@/lib/hooks";
import { createTodo } from "@/lib/server";
import { useSession } from "next-auth/react";
import { FC, useRef } from "react";
import toast from "react-hot-toast";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
	const formRef = useRef<HTMLFormElement | null>(null);
	const onDismiss = useOnModalDismiss();
	const { data: session } = useSession();
	const action = async (formData: FormData) => {
		await toast.promise(createTodo(formData, session), {
			error: (error) => error,
			success: "Todo created",
			loading: "loading...",
		});
	};

	return (
		<Modal>
			<Modal.Header>
				<h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
					Create new <span className="font-bold">Todo</span>
				</h3>
			</Modal.Header>
			<Modal.Body>
				<form action={action} ref={formRef} className="flex flex-col gap-2">
					<input
						type="text"
						name="title"
						className="px-2 py-1 bg-transparent border rounded outline-none border-zinc-300 focus-within:border-zinc-100"
					/>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<div className="flex items-center justify-end space-x-2">
					<button
						data-modal-hide="defaultModal"
						type="button"
						className={buttonVariants({ variant: "creative" })}
						onClick={() => {
							formRef.current?.requestSubmit();
						}}
					>
						Create
					</button>
					<button
						onClick={onDismiss}
						data-modal-hide="defaultModal"
						type="button"
						className={buttonVariants({ variant: "destructive" })}
					>
						Cancel
					</button>
				</div>
			</Modal.Footer>
		</Modal>
	);
};

export default Page;
