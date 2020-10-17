import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

import { Lecture } from './lecture'

import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

export enum UserType {
  Lecturer,
  User
}

@Entity({})
export class User {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @OneToMany(
        type => Lecture,
        lecture => lecture.owner,
    )
    lectures: Lecture[]

    @Column({})
    username: string

    @Column()
    fullName: string

    @Column()
    hashedPassword: string

    @Column('int')
    userType: UserType

    constructor(username, fullName, hashedPassword: string, userType) {
        this.username = username
        this.fullName = fullName

        this.userType = userType
        this.hashedPassword = hashedPassword
    }

    comparePassword(enteredPassword: string) {
        return bcrypt.compareSync(enteredPassword, this.hashedPassword)
    }
}

export const hashPassword = (plaintext: string) => {
    return bcrypt.hashSync(plaintext, 10);
}