import * as React from 'react';
import { Link } from 'react-router-dom';
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

const StyleLink = styled(Link)`
    display: block;
`;

export const LectureEntry: React.FC<Lecture> = ({name, uuid, isLive,onClick}) => {
    const link: string = "/api/lecture/" + uuid;
    console.log(name);
    console.log(uuid);
    console.log(isLive);
    return (
        <StyleLink to={link} onClick={onClick} >
            <Info>name: {name}</Info>
            <Info>live: {isLive}</Info>
        </StyleLink>
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


    
    