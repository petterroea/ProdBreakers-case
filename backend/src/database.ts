import { Connection, createConnections, getConnectionManager, Repository } from 'typeorm'

import { Lecture } from './entities/lecture'
import { User } from './entities/user'
import { Comment } from './entities/comment'

let DbConnection: Connection|null = null;

let LectureRepository: Repository<Lecture>|null = null;
let UserRepository: Repository<User>|null = null;
let CommentRepository: Repository<Comment>|null = null;

export const setupDatabaseConnection = async (connectionConfig) => {
	await createConnections(connectionConfig)
	DbConnection = getConnectionManager().get()
	LectureRepository = DbConnection.getRepository(Lecture)
	UserRepository = DbConnection.getRepository(User)
	CommentRepository = DbConnection.getRepository(Comment)
}

export const getLectureRepository = (): Repository<Lecture> => {
	if(DbConnection === null || LectureRepository === null) {
		throw new Error("Tried to get lecture repository before the connection was set up")
	}
	return LectureRepository;
}

export const getUserRepository = (): Repository<User> => {
	if(DbConnection === null || LectureRepository === null) {
		throw new Error("Tried to get user repository before the connection was set up")
	}
	return UserRepository;
}


export const getCommentRepository = (): Repository<Comment> => {
	if(DbConnection === null || LectureRepository === null) {
		throw new Error("Tried to get comment repository before the connection was set up")
	}
	return CommentRepository;
}
