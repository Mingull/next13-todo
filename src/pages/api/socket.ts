import { NextApiResponseServerIO, SocketServer } from "@/lib/socket";
import { NextApiRequest } from "next";
import { Server as ServerIO, Socket } from "socket.io";
import { Server as NetServer } from "http";

const handler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
	if (res.socket.server.io) {
		console.log("Already set up");
		res.send("Socket Server already setup");
		return;
	}
	console.log("New Socket.io server...");
	// adapt Next's net Server to http Server
	const httpServer: NetServer = res.socket.server as any;
	const io = new SocketServer(httpServer, {
		path: "/api/socket",
		cors: {
			origin: ["*"],
			methods: ["GET", "POST"],
		},
	});
	// append SocketIO server to Next.js socket server response
	res.socket.server.io = io;
	initSocket(res.socket.server.io);
	res.send("New socket server setup");
};

export const activeSockets: {
	[key: string]: SocketServer;
} = {};

function initSocket(io: SocketServer) {
	io.sockets.on("connection", (socket) => {
		socket.on("userConnected", (user) => console.log(user));
	});
}

export default handler;
export const config = {
	api: {
		bodyParser: {
			sizeLimit: "1mb",
		},
	},
};
