import * as React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
export type Lecture = {
    name: string,
    uuid: string,
    isLive: boolean,
}

const Info = styled.p`
    color: #ccc;
`;

const Link = styled.a`
    display: block;
`;

export const LectureEntry: React.FC<Lecture> = (props: Lecture) => {
    const link: string = "/api/lecture/" + props.uuid;
    return (
        <Link href={link}>
            <Info className='lectureName'>name: {props.name}</Info>
            <Info className='lectureStreamState'>live: {props.isLive}</Info>
        </Link>
    )
}

type LectureListProps = {
    lectures: Lecture[];
};

export const LectureList: React.FC<LectureListProps> = (props: LectureListProps) => {
    const [currentLecture, setCurrentLecture] = setState();
    return (
        <div>
            {props.lectures.map(lecture=>(
                <LectureEntry name = {lecture.name} isLive = {lecture.isLive} uuid = {lecture.uuid} />
            ))}
        </div>
        <div>
            <MessageList lecture={currentLecture}></MessageList>
        </div>
    )
}


    
    