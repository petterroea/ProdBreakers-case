import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

import { Lecture } from './lecture'

@Entity({})
export class Recording {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @ManyToOne(
        type => Lecture,
        lecture => lecture.recordings,
    )
    lecture: Lecture

    @Column()
    start: Date

    @Column({nullable: true})
    fileName: string|null

    @Column({nullable: true})
    end: Date|null

    constructor(lecture) {
        this.lecture = lecture
        this.start = new Date()
    }
}
