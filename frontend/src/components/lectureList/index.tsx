import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import MessageList from '../messageList';

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

const Container = styled.div`
    height: 60%;
  `

const Column = styled.div`
    width: 500px;
    height: 100%;
    border: 1px solid #efefef;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-right: 10px;
    float: left;
  `

export const LectureEntry: React.FC<Lecture> = ({ name, uuid, isLive, onClick }) => {
    const link: string = '/player/' + uuid;
    return (
        <div>
            <StyleLink to={link} onClick={onClick}>Link</StyleLink>
            <Info>name: {name}</Info>
            <Info>live: {isLive}</Info>
        </div>
    );
};

type LectureListProps = {
    lectures: Lecture[];
};

export const LectureList: React.FC<LectureListProps> = (props: LectureListProps) => {
    const [currentLecture, setCurrentLecture] = React.useState(''); // UUID

    const onClick = (lecture: string) => {
        setCurrentLecture(lecture);
    };
    return (
        <Container>
            <Column>
                <h2>Lectures</h2>
                {props.lectures.map((lecture) => (
                    <LectureEntry
                        key={lecture.uuid}
                        name={lecture.name}
                        isLive={lecture.isLive}
                        uuid={lecture.uuid}
                        onClick={() => {
                            onClick(lecture.uuid);
                        }}
                    />
                ))}
            </Column>
            {currentLecture && (
                <Column>
                        <h2>{currentLecture}</h2>
                        <MessageList lecture={currentLecture} />
                </Column>
            )}
        </Container>
    );
};