import socket from 'socket.io';

import { Lecture } from '../entities/lecture'
import { Comment } from '../entities/comment'
import { getLectureRepository, getCommentRepository } from '../database';

export const initializeRealtimeComponent= (http) => {
	let io = socket(http);

	let runningStreams = []

	const chatHandler = async (socket, data) => {
		const { uuid, message } = data

		const lecture = await getLectureRepository().findOne({where: {uuid}})
		if(lecture === undefined) {
			console.log('lecture doesnt exist wtf')
		} else {
			const chat = new Comment(null, message, lecture)
			await getCommentRepository().save(chat)

			io.to(uuid).emit('chat', { user: 'bob', message, uuid: chat.uuid, postedDate: chat.postedDate  })
		}
	}

	const joinHandler = async (socket, data) => {
		const { uuid } = data
		socket.join(uuid)
		if(runningStreams.includes(uuid)) {
			socket.emit('streamStart', {path: `/live/${uuid}`})
		}
		console.log(`User joined ${uuid}`)
	}

	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('chat', (data) => chatHandler(socket, data))
		socket.on('join', (data) => joinHandler(socket, data))
		socket.on('streamStart', (data) => {
			console.log(`Stream started: ${JSON.stringify(data)}`)

			const uuid = data.StreamPath.replace("/live/", "")
			io.to(uuid).emit('streamStart', {path: data.StreamPath})

			runningStreams.push(uuid)
		})
		socket.on('streamEnd', (data) => {
			console.log(`Stream end: ${JSON.stringify(data)}`)

			const uuid = data.StreamPath.replace("/live/", "")
			io.to(uuid).emit('streamEnd', {path: data.StreamPath})
			runningStreams.filter((entry) => {
				return entry !== uuid
			})
		})
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	console.log('Set up connection')
}
