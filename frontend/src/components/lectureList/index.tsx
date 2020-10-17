import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageList from '../messageList'

export interface Lecture {
    name: string;
    uuid: string;
    isLive: boolean;
    onClick: () => void;
}

const Info = styled.p`
    color: #ccc;
`;

const Link = styled.a`
    display: block;
`;

export const LectureEntry: React.FC<Lecture> = ({name, uuid, isLive,onClick}) => {
    const link: string = "/api/lecture/" + uuid;

    return (
        <Link href={link} onClick={onClick} >
            <Info className='lectureName'>name: {name}</Info>
            <Info className='lectureStreamState'>live: {isLive}</Info>
        </Link>
    )
}

type LectureListProps = {
    lectures: Lecture[];
};

export const LectureList: React.FC<LectureListProps> = (props: LectureListProps) => {
    const [currentLecture, setCurrentLecture] = React.useState(""); // UUID

    const onClick = (lecture: string) => {
        console.log("New main lecture: "+ lecture);
        setCurrentLecture(lecture);
    }
    return (
        <div>
            <div>
                {props.lectures.map(lecture=>(
                    <LectureEntry name = {lecture.name} isLive = {lecture.isLive} uuid = {lecture.uuid} onClick = {() => {onClick(lecture.uuid)}}/>
                ))}
            </div>
            <div>
                <MessageList lecture={currentLecture}/>
            </div>
        </div>
    )
}


    
    