import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
const List = styled.ul``;

const ListEntry = styled.li`
    list-style-type: none;
`;
const StyleLink = styled(Link)`
    display: block;
    height: 5%;
`;

const LectureSelector = styled.button`
    display: block;
    background-color: Transparent;
    background-repeat: no-repeat;
    border: none;
    cursor: pointer;
    overflow: hidden;
    outline: none;
`;

const Container = styled.div`
    height: 60%;
`;

const Column = styled.div`
    width: 500px;
    height: 100%;
    border: 1px solid #efefef;
    border-radius: 25px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin-right: 10px;
    float: left;
    overflow: scroll;
`;

export const LectureEntry: React.FC<Lecture> = ({ name, uuid, isLive, onClick }) => {
    const link: string = '/player/' + uuid;
    return (
        <ListEntry>
            <LectureSelector onClick={onClick}>
                <Info>name: {name}</Info>
                <Info>{isLive ? 'Presentation is Live now!' : 'This is a recording.'}</Info>
            </LectureSelector>
        </ListEntry>
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
                <List>
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
                </List>
            </Column>
            {currentLecture && (
                <Column>
                    <h2>{currentLecture}</h2>
                    <StyleLink to={'/player/' + currentLecture}>Link to Stream</StyleLink>
                    <MessageList lecture={currentLecture} />
                </Column>
            )}
        </Container>
    );
};
