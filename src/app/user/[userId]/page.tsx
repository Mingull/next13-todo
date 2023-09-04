import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import { FC } from "react";
import { prisma } from "@/db";
import { UserNotFoundError } from "@/lib/exceptions/Errors";

const Page = async ({ params }: { params: { userId: string } }) => {
	const user = await prisma.user.findFirst({
		where: { id: params.userId },
	});
	if (!user) throw new UserNotFoundError();
	return <pre>{JSON.stringify(user, null, 4)}</pre>;
};

export default Page;
