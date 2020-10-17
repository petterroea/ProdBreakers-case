import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@styled-icons/fa-solid/User';
import { UnlockAlt } from '@styled-icons/fa-solid/UnlockAlt';
import { historyObject as history } from '../../router/historyObject';

import { VideoPlayer } from '../../components/videoPlayer';

import socketIOClient, { Socket } from 'socket.io-client';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const WrapperTwo = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-wrap: wrap;
`;

const CommentField = styled.div`
    min-width: 30em;
    min-height: 30em;

    overflow-y: auto;

    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 1em;

    display: flex;
    flex-direction: column;
`;

const CommentHeader = styled.h3``;

const CommentUserName = styled.h5``;

const CommentBody = styled.div`
    height: 100%;
`;

const CommentEntry = styled.div`
    background-color: #ff0000;
`;

const Input = styled.input`
    font-size: 16px;
    color: #000000;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 45px;
    background: transparent;
    padding: 0 5px 0 38px;
    border: none;
    outline: none;
`;

interface ChatMessage {
    user: string;
    message: string;
    uuid: string;
}

export const ReadyStreamPage: React.FC = () => {
    const { uuid } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    const [lectureObj, setLectureObj] = React.useState({} as any);

    React.useEffect(() => {
        const metadataFetch = async () => {
            const response = await fetch(`/api/lecture/${uuid}`);
            if (response.status !== 200) {
                setNotFound(true);
                return;
            }
            setLectureObj(await response.json());
            setLoading(false);
        };

        metadataFetch();
    }, []);

    if (notFound) {
        return (
            <Wrapper>
                <h1>Lecture not found</h1>
            </Wrapper>
        );
    }

    if (loading) {
        return (
            <Wrapper>
                <h1>Loading...</h1>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h2>{lectureObj.name}</h2>
            <WrapperTwo>
                <h1>Ready to stream!</h1>
                <h3>RTMP</h3>
                <code>{`rtmp://localhost:1935/live/${uuid}`}</code>
            </WrapperTwo>
        </Wrapper>
    );
};
