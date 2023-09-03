import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { Server as IOServer } from "socket.io";
import { Socket as IOClient } from "socket.io-client";

export type NextApiResponseServerIO = NextApiResponse & {
	readonly socket: Socket & {
		server: NetServer & {
			io: SocketServer;
		};
	};
};

export type NextResponseServerIO = NextResponse & {
	readonly socket: Socket & {
		server: NetServer & {
			io: IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
		};
	};
};
export interface ClientToServerEvents {
	userConnected: (user: string) => void;
}
export interface ServerToClientEvents {}
export interface InterServerEvents {
	ping: () => void;
}
export interface SocketData {
	name: string;
	age: number;
}

export type UserData = {
	id: number;
	name: string;
	status: "Online" | "Offline";
};

export class SocketServer extends IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> {}
export class SocketClient extends IOClient<ServerToClientEvents, ClientToServerEvents> {}
