import socket from 'socket.io';

export const initializeRealtimeComponent= (http) => {
	let io = socket(http);

	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
}
