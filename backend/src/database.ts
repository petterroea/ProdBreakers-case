import { Connection, createConnections, getConnectionManager, Repository } from 'typeorm'

import { Lecture } from './entities/lecture'
import { User } from './entities/user'

let DbConnection: Connection|null = null;

let LectureRepository: Repository<Lecture>|null = null;
let UserRepository: Repository<User>|null = null;

export const setupDatabaseConection = async (connectionConfig) => {
	await createConnections(connectionConfig)
	DbConnection = getConnectionManager().get()
	LectureRepository = DbConnection.getRepository(Lecture)
	UserRepository = DbConnection.getRepository(User)
}

export const getLectureRepository = (): Repository<Lecture> => {
	if(DbConnection === null || LectureRepository === null) {
		throw new Error("Tried to get lecture repository before the connection was set up")
	}
	return LectureRepository;
}

export const getUserRepository = (): Repository<User> => {
	if(DbConnection === null || LectureRepository === null) {
		throw new Error("Tried to get lecture repository before the connection was set up")
	}
	return UserRepository;
}
