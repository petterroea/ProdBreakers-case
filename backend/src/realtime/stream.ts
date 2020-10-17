import { Recording } from '../entities/recording'
import { getLectureRepository, getCommentRepository, getRecordingRepository } from '../database';

import fs from 'fs'
import path from 'path'

export const streamStartHandler = async (uuid: string) => {
	console.log(`Stream started: ${uuid}`)
	
	const lecture = await getLectureRepository().findOne({where: {
		uuid
	}})
	if(lecture === undefined) {
		console.log("WARNING: Got stream start for unknown lecture")
		return
	}
	//See if there are any recordings that aren't finished
	const oldRecording = await getRecordingRepository().findOne({where: {
		end: null
	}})
	if(oldRecording !== undefined) {
		await getRecordingRepository().delete(oldRecording)
	}

	//Create recording
	const recording = new Recording(lecture)
	await getRecordingRepository().save(recording)
}

export const streamEndHandler = async (uuid: string) => {
	console.log(`Stream end: ${uuid}`)

	const lecture = await getLectureRepository().findOne({where: {
		uuid
	}})
	if(lecture === undefined) {
		console.log("WARNING: Got stream end for unknown lecture")
		return
	}
	const recording = await getRecordingRepository().findOne({where: {
		end: null
	}})
	if(recording === undefined) {
		console.log("WARNING: Tried to end recording, but no recording available")
		return
	}
	recording.end = new Date()
	//Find the filename
	if(fs.existsSync(`/var/vods/live/${uuid}`)) {
		const files = fs.readdirSync(`/var/vods/live/${uuid}`)
		const allReordings = await getRecordingRepository().find({where: {
			lecture
		}})

		const remainingFiles = files.filter((file: string) => {
			let isIn = false
			for(let rec of allReordings) {
				if(rec.fileName !== undefined && rec.fileName === file) {
					isIn = true;
					break
				}
			}
			return !isIn
		})

		if(remainingFiles.length === 1) {
			recording.fileName = remainingFiles[0]
		} else {
			throw new Error('More than one file left')
		}
	  } else {
	    throw new Error('Stream is done, but no vod')
	  }


	await getRecordingRepository().save(recording)
}