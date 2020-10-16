import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm'

import { User } from './user'

@Entity({})
export class Lecture {
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @ManyToOne(
        type => User,
        user => user.lectures,
    )
    owner: User

    @Column({})
    name: string

    @Column()
    description: string

    @Column()
    start: Date

    @Column()
    end: Date

    constructor(owner: User, name: string, description: string, start, end) {
        this.owner = owner

        this.name = name
        this.description = description

        this.start = start
        this.end = end
    }
}
