import socket from 'socket.io';

import { Lecture } from '../entities/lecture'
import { Recording } from '../entities/recording'
import { Comment } from '../entities/comment'
import { getLectureRepository, getCommentRepository } from '../database';

import { streamStartHandler, streamEndHandler } from './stream'

interface RunningStream {
	uuid: string;
	startTime: Date;
}

const fancyFilter = (streams: RunningStream[], uuid: string) => {
	return streams.filter((runningStream) => {
		return runningStream.uuid === uuid
	})
}

export const initializeRealtimeComponent= (http) => {
	let io = socket(http);

	let runningStreams = [] as RunningStream[]

	const chatHandler = async (socket, data) => {
		const { uuid, message } = data

		const lecture = await getLectureRepository().findOne({where: {uuid}})
		if(lecture === undefined) {
			console.log('lecture doesnt exist wtf')
		} else {
			const chat = new Comment(null, message, lecture)
			await getCommentRepository().save(chat)

			io.to(uuid).emit('chat', { user: 'bob', body: message, uuid: chat.uuid, postedDate: chat.postedDate  })
		}
	}

	const joinHandler = async (socket, data) => {
		const { uuid } = data
		socket.join(uuid)
		const existingStream = fancyFilter(runningStreams, uuid)
		if(existingStream.length != 0) {
			socket.emit('streamStart', {path: `/live/${uuid}`, startTime: existingStream[0].startTime})
		}
		console.log(`User joined ${uuid}`)
	}

	io.on('connection', (socket) => {
		console.log('a user connected');
		socket.on('chat', (data) => chatHandler(socket, data))
		socket.on('join', (data) => joinHandler(socket, data))
		socket.on('streamStart', async (data) => {
			const uuid = data.StreamPath.replace("/live/", "")
			
			await streamStartHandler(uuid)

			//Finally, send update
			io.to(uuid).emit('streamStart', {path: data.StreamPath, startTime: new Date()})

			if(fancyFilter(runningStreams, uuid).length === 0) {
				runningStreams.push({
					uuid: uuid,
					startTime: new Date()
				})
			}
		})
		socket.on('streamEnd', async (data) => {
			const uuid = data.StreamPath.replace("/live/", "")

			await streamEndHandler(uuid)
			console.log("Sending stream end")
			runningStreams = runningStreams.filter((entry) => {
				return entry.uuid !== uuid
			})
			io.to(uuid).emit('streamEnd', {path: data.StreamPath})
		} )
		socket.on('disconnect', () => {
			console.log('user disconnected');
		});
	});
	console.log('Set up connection')
}
