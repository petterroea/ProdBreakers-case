import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user'
import { Lecture } from './lecture'

@Entity({})
export class Comment {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @ManyToOne(
        type => Comment,
        comment => comment.children,
    )
    thread: Comment

    @OneToMany(
        type => Comment,
        comment => comment.thread,
    )
    children: Comment[]

    @ManyToOne(
        type => User
    )
    owner: User|null

    @ManyToOne(
        type => Lecture,
        {
            nullable: true
        }
    )
    lecture: Lecture

    @Column({type: 'text', nullable: true})
    title?: string

    @Column()
    body: string

    @Column()
    postedDate: Date

    constructor(owner: User|null, body: string, lecture: Lecture) {
        this.owner = owner

        this.lecture = lecture
        this.body = body
        this.postedDate = new Date()
    }
}
