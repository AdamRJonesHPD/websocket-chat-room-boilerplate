const WebSocket = require('ws');

const server = new WebSocket.Server(
	{ port: 8081 },
//	() => console.log('Server running on port 8081')
);

const users = new Set();
const recentMessages = [];

const sendMessage = (message) => {
	for (const user of users) {
		user.socket.send(JSON.stringify(message));
	}
};

server.on('connection', (socket) => {
	console.log('New user connected!')

	const userRef = {
		socket: socket,
		lastActiveAt: Date.now(),
	};
	users.add(userRef);

	socket.on('message', (message) => {
		// 1. When a message is received...
		try {
			// 2. Attempt to parse it,
			const parsedMessage = JSON.parse(message);

			// 3. Then ensure that it is a valid message
			if (
				typeof parsedMessage.sender !== 'string' ||
				typeof parsedMessage.body !== 'string'
			) {
				console.error('Invalid message recevied!', nessage);
				return;
			}

			const numberOfRecentMessages = recentMessages
				.filter((message) => message.sender === parsedMessage.sender)
				.length;
			if (numberOfRecentMessages >= 30) {
				socket.close(4000, 'flooding the chat');
				return;
			}

			// 4. and if it is, send it!
			const verifiedMessage = {
				sender: parsedMessage.sender,
				body: parsedMessage.body,
				sentAt: Date.now,
			}

			sendMessage(verifiedMessage);

			userRef.lastActiveAt = Date.now();

			recentMessages.push(verifiedMessage);
			setTimeout(() => recentMessages.shift(), 60000);
		} catch (error) {
			// 1b. If the message wasn't valid JSON, JSON.parse would throw an error, which we catch here
			console.error('Error parsing message!', error);
		}
	});

	socket.on('close', (code, reason) => {
		console.log(`User disconnected with code ${code} and reason ${reason}!`);
		users.delete(userRef);
	});
});

setInterval(() => {
		const now = Date.now();

		for (const user of users) {
			if (user.lastActiveAt < now - 300000) {
				user.socket.close(4000, 'inactivity');
			}
		}
}, 10000);
