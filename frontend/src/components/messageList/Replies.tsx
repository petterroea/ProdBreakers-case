import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootStateType } from '../../state/reducers';

const Replies = (props: any) => {
    const uuid: string = props.uuid;
    const [replies, setReplies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const authSelector = useSelector((state: RootStateType) => state.authentication);
    const token: string | undefined = authSelector.user?.token;

    useEffect(() => {
        const internal = async () => {
            setLoading(true);
            const res = await fetch(`/api/comment/reply/${uuid}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) {
                setLoading(false);
                setError(`Error: The server responded with status code ${res.status} (${res.statusText})`);
                return;
            }
            setLoading(false);
            setError('');
            const replies = await res.json();
            setReplies(replies);
        };
        if (uuid) {
            internal();
        }
    }, [uuid]);

    if (error) {
        return (
            <div>
                Failed to load replies:
                {error}
            </div>
        );
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {replies.length
                ? replies.map((reply: { body: string; postedDate: string; title: string | null; uuid: string }) => {
                      const { body, title, uuid } = reply;
                      return (
                          <div key={uuid}>
                              {title ? <h6>{title}</h6> : null}
                              <p>{`>${body}`}</p>
                          </div>
                      );
                  })
                : 'No replies'}
        </div>
    );
};

export default Replies;
