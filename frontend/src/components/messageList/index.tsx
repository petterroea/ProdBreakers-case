import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Thread from './Thread';
import { RootStateType } from '../../state/reducers';

const MessageList = (props: any) => {
  const currentLecture: string = props.currentLecture;
  const [messages, setMessages] = useState(null as any[]|null);

  const authSelector = useSelector((state: RootStateType) => state.authentication);
  const token: string|undefined = authSelector.user?.token;

  useEffect(() => {
    const internal = async () => {
      const res: any = await fetch(`/api/comment/lecture/${currentLecture}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }, // technically not necessary right now, but we might change that
      });
      const msgs = await res.json();
      setMessages(msgs);
    };
    internal();
  }, [currentLecture, token]);

  return (
    <div>
      {messages?.map((message: any) => <Thread key={message.uuid} message={message} />) ?? 'Loading...'}
    </div>
  );
}

export default MessageList;
