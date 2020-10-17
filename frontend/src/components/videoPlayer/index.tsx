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
import videojs, { VideoJsPlayer } from 'video.js';

import socketIOClient from 'socket.io-client';

const Wrapper = styled.div`
    flex: 1;
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
    const [player, setPlayer] = React.useState<VideoJsPlayer | null>(null);

    const url = props.vod || props.stream;

    React.useEffect(() => {
        if (url && videoRef.current) {
            if (!player) {
                const _player = videojs(videoRef.current, undefined, () => {
                    _player.src(url);
                });
                setPlayer(_player);
            } else {
                player.src(url);
            }
        }
    }, [url]);

    return (
        <Wrapper>
            {!url ? (
                <h2>Stream is starting shortly, please wait!</h2>
            ) : (
                <>
                    <div data-vjs-player>
                        <Video ref={videoRef} className="video-js vjs-16-9" playsInline />
                    </div>
                    <Controlls url={url} isStream={!!props.stream && !props.vod} videoRef={videoRef} />
                </>
            )}
        </Wrapper>
    );
};
