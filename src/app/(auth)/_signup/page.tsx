// "use client";
// import { ClientToServerEvents, ServerToClientEvents } from "@/lib/socket";
// import { useEffect, useState } from "react";
// import { Socket, io } from "socket.io-client";

// export default function Page() {
// 	const [users, setUsers] = useState([]);

// 	useEffect(() => {
// 		const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

// 		// Listen for updates from the server
// 		socket.on("users", (data) => {
// 			setUsers(data);
// 		});

// 		// Clean up the socket connection when the component unmounts
// 		return () => {
// 			socket.disconnect();
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<h1>Real-Time User Status</h1>
// 			<ul>
// 				{users.map((user) => (
// 					<li key={user.id}>
// 						{user.name} - {user.status}
// 					</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }
