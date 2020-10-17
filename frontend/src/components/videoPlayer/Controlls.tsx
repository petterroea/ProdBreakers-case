import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ControllerPaus } from '@styled-icons/entypo/ControllerPaus';
import { ControllerPlay } from '@styled-icons/entypo/ControllerPlay';
import { historyObject as history } from '../../router/historyObject';

import socketIOClient from 'socket.io-client';

const Wrapper = styled.div`
    display: flex;
    align-items: center;
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
        width: 1px;
        height: 25px;
        background: #4caf50;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        width: 1px;
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
`;

interface ControllsProps {
    videoRef: React.MutableRefObject<HTMLVideoElement | null>;
    isStream: boolean;
}

export const Controlls: React.FC<ControllsProps> = ({ videoRef, isStream }) => {
    const [min, setMin] = React.useState(0);
    const [max, setMax] = React.useState(0);
    const [isPaused, setIsPaused] = React.useState(true);
    const [currentTime, setCurrentTime] = React.useState(0);

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

    return (
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
                <SliderComments></SliderComments>
            </SliderWrapper>
        </Wrapper>
    );
};
