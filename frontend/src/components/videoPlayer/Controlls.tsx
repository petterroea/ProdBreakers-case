import * as React from 'react';
import styled from 'styled-components';
import { ControllerPaus } from '@styled-icons/entypo/ControllerPaus';
import { ControllerPlay } from '@styled-icons/entypo/ControllerPlay';
import { Comment } from '@styled-icons/boxicons-regular/Comment';

import { ChatMessage } from './types';
import { DisplayComment } from '../displayComment';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
`;

const OuterWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Slider = styled.input`
    width: 100%;

    -webkit-appearance: none;
    height: 25px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;

    &:hover:enabled {
        opacity: 1;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 3px;
        height: 25px;
        background: #4caf50;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 3px;
        height: 25px;
        background: #4caf50;
        cursor: pointer;
    }
`;

const SliderWrapper = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`;

const SliderComments = styled.div`
    width: 100%;
    position: relative;
`;

interface CommentProps {
    progress: number;
}

const CommentEntry = styled.div`
    width: 1.5em;
    height: 1.5em;

    position: absolute;
    top: 0;
    left: ${(props: CommentProps) => {
        return `${props.progress * 100}%`;
    }};
`;

const CommentList = styled.div`
    position: absolute;
    min-width: 10em;
    min-height: 10em;

    border: 1px solid #ccc;
    background-color: #fff;

    box-shadow: 5px 10px 11px #888888;

    top: 1.2em;
    left: ${(props: CommentProps) => {
        return `${props.progress * 100}%`;
    }};
`;

interface ControllsProps {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    isStream: boolean;
    url: string | null;
    start: string;
    end: string | null;
    chats: Array<ChatMessage>;
}

export const Controlls: React.FC<ControllsProps> = ({ videoRef, isStream, url, start, end, chats }) => {
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(0);

    const startTime = new Date(start);
    let endTime = end ? new Date(end) : new Date();
    if (!isStream) {
        if (videoRef.current) {
            endTime = new Date(startTime.getTime() + videoRef.current.duration * 1000);
        }
    }

    const duration = endTime.getTime() - startTime.getTime();

    //const commentSpacing = duration / 30000 < 4 ? 4 : duration / 30000;
    const commentSpacing = 4;

    React.useEffect(() => {
        setIsPaused(true);
    }, [url]);

    React.useEffect(() => {
        if (videoRef.current) {
            videoRef.current.onloadedmetadata = function () {
                if (videoRef.current) {
                    let time = videoRef.current.duration;
                    if (videoRef.current.duration === NaN) {
                        time = videoRef.current.currentTime;
                    }
                    setMax(time);
                }
            };
            videoRef.current.ontimeupdate = function () {
                if (videoRef.current) {
                    setCurrentTime((lastState) => {
                        if (videoRef.current) {
                            return videoRef.current.currentTime;
                        }
                        return lastState;
                    });
                    if (isStream) {
                        setMax((lastState) => {
                            if (videoRef.current) {
                                return videoRef.current.currentTime;
                            }
                            return lastState;
                        });
                    }
                }
            };
            videoRef.current.onended = function () {
                setIsPaused(true);
            };
        }
    }, [videoRef]);

    React.useEffect(() => {
        if (videoRef.current) {
            if (!isPaused) {
                videoRef.current.play();
            } else {
                videoRef.current.pause();
            }
        }
    }, [isPaused]);

    const onChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = parseFloat(e.target.value);
        setCurrentTime((prevState) => {
            if (videoRef.current) {
                videoRef.current.currentTime = val;
            }
            return val;
        });
    };

    const onChangePausePlay = () => {
        setIsPaused((val) => !val);
    };

    const usefulChats = chats.filter((chat) => {
        const chatTime = new Date(chat.postedDate);
        return chatTime.getTime() > startTime.getTime() && chatTime.getTime() < endTime.getTime();
    });

    const activeChats = usefulChats.filter((chat) => {
        const chatTime = new Date(chat.postedDate);
        const normalizedTime = (chatTime.getTime() - startTime.getTime()) / 1000;

        if (isStream) {
            return Math.abs(endTime.getTime() - normalizedTime) < commentSpacing;
        } else {
            if (videoRef !== null && videoRef.current !== null) {
                return Math.abs(videoRef.current.currentTime - normalizedTime) < commentSpacing;
            }
        }

        return false;
    });

    const avgDuration =
        activeChats.length === 0
            ? 0
            : activeChats.reduce((acc, chat) => {
                  const chatTime = new Date(chat.postedDate);
                  return acc + (chatTime.getTime() - startTime.getTime()) / duration;
              }, 0) / activeChats.length;

    return (
        <OuterWrapper>
            <Wrapper>
                {isPaused ? (
                    <ControllerPlay size="2em" onClick={onChangePausePlay} />
                ) : (
                    <ControllerPaus size="2em" onClick={onChangePausePlay} />
                )}
                <SliderWrapper>
                    <Slider
                        type="range"
                        min={min}
                        max={max}
                        onChange={onChangeTime}
                        value={currentTime}
                        disabled={isStream}
                    />
                    <SliderComments>
                        {usefulChats.map((chat) => {
                            const chatTime = new Date(chat.postedDate);

                            return (
                                <CommentEntry
                                    key={chat.uuid}
                                    progress={(chatTime.getTime() - startTime.getTime()) / duration}
                                >
                                    <Comment />
                                </CommentEntry>
                            );
                        })}
                        {activeChats.length !== 0 ? (
                            <CommentList progress={avgDuration}>
                                {activeChats.map((chat) => {
                                    return <div>
                                        <DisplayComment message={chat} key={chat.uuid} />
                                        <button> Create Reply </button>
                                    </div>;
                                })}
                            </CommentList>
                        ) : null}
                    </SliderComments>
                </SliderWrapper>
            </Wrapper>
        </OuterWrapper>
    );
};
