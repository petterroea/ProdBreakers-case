import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@styled-icons/fa-solid/User';
import { UnlockAlt } from '@styled-icons/fa-solid/UnlockAlt';
import { historyObject as history } from '../../router/historyObject';
import { Controlls } from './Controlls';

import socketIOClient from 'socket.io-client';

const Wrapper = styled.div`
    background-color: #f;
`;

const Video = styled.video`
    width: 500px;
`;

const Slider = styled.input`
    width: 100%;
`;

interface ChatMessage {
    user: string;
    message: string;
    uuid: string;
}

interface VideoPlayerProps {
    uuid: string;
    ended: boolean;
    stream: string | null;
    vod: string | null;
    chats: Array<ChatMessage>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);

    return (
        <Wrapper>
            <h2>The lecture has not started yet</h2>
            <Video ref={videoRef}>
                <source src="/placeholder.mp4" type="video/mp4" />
            </Video>
            <Controlls videoRef={videoRef} />
        </Wrapper>
    );
};
