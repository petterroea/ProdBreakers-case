import React from 'react';

interface Props {
    lecture: string
}
const MessageList:React.FC<Props> = ({lecture}) => <div>Messages are here! {lecture}</div>;

export default MessageList;
