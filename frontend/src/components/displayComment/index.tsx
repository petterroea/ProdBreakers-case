import * as React from 'react';
import styled from 'styled-components';

import { ChatMessage } from '../../components/videoPlayer/types';

const CommentWrapper = styled.div`
    border-bottom: 1px solid #ddd;
    p {
        margin: 0.2em;
    }
`;

interface DisplayCommentProps {
    message: ChatMessage;
}

export const DisplayComment = (props: DisplayCommentProps) => (
    <CommentWrapper>
        <p>
            <b>{props.message.user}</b>
        </p>
        <p>{props.message.body}</p>
    </CommentWrapper>
);
