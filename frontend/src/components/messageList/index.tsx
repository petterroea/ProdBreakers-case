import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Thread from './Thread';
import { RootStateType } from '../../state/reducers';

const MessageList = (props: any) => {
    const currentLecture: string = props.lecture;
    const [messages, setMessages] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);
    const [commentBody, setCommentBody] = useState('');

    const authSelector = useSelector((state: RootStateType) => state.authentication);
    const token: string | undefined = authSelector.user?.token;

    useEffect(() => {
        const internal = async () => {
            setLoading(true);
            const res: any = await fetch(`/api/comment/lecture/${currentLecture}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }, // technically not necessary right now, but we might change that
            });
            const msgs = await res.json();
            setMessages(msgs);
            setLoading(false);
        };
        if (currentLecture) {
            internal();
        }
    }, [currentLecture, token]);

    const submit = async (e: any) => {
        e.preventDefault();
        const res = await fetch(`/api/comment/lecture/${currentLecture}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                body: commentBody,
            }),
        });
        if (!res.ok) {
            return;
        }
        const newComment = await res.json();
        setMessages((prev) => [...prev, newComment]);
        setCommentBody('');
    };

    return (
        <div>
            {loading ? 'Loading...' : messages.map((message: any) => <Thread key={message.uuid} message={message} />)}
            <form onSubmit={submit}>
                <input type="text" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
                <input type="submit" value="Comment" />
            </form>
        </div>
    );
};

export default MessageList;
