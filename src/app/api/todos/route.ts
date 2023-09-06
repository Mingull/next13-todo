import { prisma } from "@/prisma_db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const todos = await prisma.todo.findMany();

	return NextResponse.json(/** json code here */);
}

export async function POST(request: NextRequest) {
	const res = await request.json();
	return NextResponse.json({ res });
}
