import socket from 'socket.io';

import { Lecture } from '../entities/lecture'
import { getLectureRepository } from '../database';

export const initializeRealtimeComponent= (http) => {
	let io = socket(http);

	let chatRooms = {}

	const chatHandler = async (socket, data) => {
		const { uuid, message } = data

		const lecture = await getLectureRepository().findOne({where: {uuid}})
		if(lecture === undefined) {
			console.log('lecture doesnt exist wtf')
		} else {
			io.to(uuid).emit('chat', { user: 'bob', message })
		}
	}

	const joinHandler = async (socket, data) => {
		const { uuid } = data
		socket.join(uuid)
		console.log(`User joined ${uuid}`)
	}

	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('chat', (data) => chatHandler(socket, data))
		socket.on('join', (data) => joinHandler(socket, data))
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	console.log('Set up connection')
}
