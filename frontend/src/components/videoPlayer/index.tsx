import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User } from '@styled-icons/fa-solid/User';
import { UnlockAlt } from '@styled-icons/fa-solid/UnlockAlt';
import { historyObject as history } from '../../router/historyObject';

import socketIOClient from 'socket.io-client';

const Wrapper = styled.div`
    background-color: #f;
`;

interface VideoPlayerProps {
    uuid: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = (props: VideoPlayerProps) => {
    return (
        <Wrapper>
            <h2>The lecture has not started yet</h2>
        </Wrapper>
    );
};
