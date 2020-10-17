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
    flex-direction: row;
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

const VodList = styled.div`
    width: 80%;
`;
const VodFlex = styled.div`
    display: flex;
`;

const VodEntry = styled.div`
    padding: 1em;
    border: 1px solid #ddd;
    overflow-x: auto;
    width: 10em;
    :hover {
        background-color: #eee;
        cursor: pointer;
    }
`;

const CommentWrapper = styled.div`
    border-bottom: 1px solid #ddd;
    p {
        margin: 0.2em;
    }
`;

interface ChatMessage {
    user: string;
    message: string;
    uuid: string;
}

interface Recording {
    start: string;
    uuid: string;
    fileName: string;
    end: string;
}

export const VideoPlayerPage: React.FC = () => {
    const { uuid } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    const [chatMessages, setChatMessages] = React.useState([] as ChatMessage[]);

    const [socket, setSocket] = React.useState({} as typeof Socket);

    const validationSchema = React.useMemo(
        () =>
            yup.object({
                message: yup.string().min(2).required('Message is required'),
            }),
        [],
    );

    const { handleSubmit, register, errors, reset } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = handleSubmit((data) => {
        socket.emit('chat', { ...data, uuid });
        reset();
    });

    const [lectureObj, setLectureObj] = React.useState({} as any);

    React.useEffect(() => {
        const socket = socketIOClient();
        setSocket(socket);

        const metadataFetch = async () => {
            const response = await fetch(`/api/lecture/${uuid}`);
            if (response.status !== 200) {
                setNotFound(true);
                return;
            }
            setLectureObj(await response.json());

            socket.emit('join', { uuid });

            socket.on('chat', (data: any) => {
                console.log('Recv chat');
                console.log(data);
                setChatMessages((prev) => [...prev, data]);
            });

            socket.on('streamStart', (data: any) => {
                console.log('Stream start');
                console.log(data);
            });

            socket.on('streamEnd', (data: any) => {
                console.log('Stream end');
                console.log(data);
            });

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
                <VideoPlayer uuid={uuid}></VideoPlayer>
                <CommentField key={1}>
                    <CommentHeader>Comments</CommentHeader>
                    <CommentBody>
                        {chatMessages.map((message) => {
                            return (
                                <CommentWrapper key={message.uuid}>
                                    <p>
                                        <b>{message.user}</b>
                                    </p>
                                    <p>{message.message}</p>
                                </CommentWrapper>
                            );
                        })}
                    </CommentBody>
                    <CommentEntry>
                        <form onSubmit={onSubmit}>
                            <Input name="message" ref={register} />
                        </form>
                    </CommentEntry>
                </CommentField>
            </WrapperTwo>
            {lectureObj.recordings.length !== 0 ? (
                <VodList>
                    <h1>Earlier recordings</h1>
                    <VodFlex>
                        {lectureObj.recordings.map((recording: Recording) => {
                            return (
                                <VodEntry key={`/vods/live/${uuid}/${recording.fileName}`}>
                                    {recording.fileName}
                                </VodEntry>
                            );
                        })}
                    </VodFlex>
                </VodList>
            ) : null}
            <div>
                {lectureObj.description.split('\n').map((line: string, index: number) => {
                    return <p key={index}>{line}</p>;
                })}
            </div>
        </Wrapper>
    );
};
