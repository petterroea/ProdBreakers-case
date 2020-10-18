import * as React from 'react';
import styled from 'styled-components';
import { Controlls } from './Controlls';
import videojs, { VideoJsPlayer } from 'video.js';

import { ChatMessage, Recording, Stream } from './types';

const Wrapper = styled.div`
    flex: 1;
`;

const Video = styled.video`
    width: 500px;
`;

interface VideoPlayerProps {
    uuid: string;
    ended: boolean;
    stream: Stream | null;
    vod: Recording | null;
    chats: Array<ChatMessage>;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const [player, setPlayer] = React.useState<VideoJsPlayer | null>(null);

    const vod = props.vod;
    const vodUrl = vod === null ? null : `http://localhost:3000/vods/live/${props.uuid}/` + vod.fileName;

    const stream = props.stream;
    const streamUrl = stream === null ? null : stream.url;

    const url = vodUrl || streamUrl;

    const start = vod !== null ? vod['start'] : stream !== null ? stream.startTime : 'none';

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
                    <Controlls
                        chats={props.chats}
                        url={url}
                        isStream={!!props.stream && !props.vod}
                        videoRef={videoRef}
                        start={start}
                        end={vod !== null ? vod.end : null}
                    />
                </>
            )}
        </Wrapper>
    );
};
