import React, { useState } from 'react';

import Replies from './Replies';

const Thread = (props: any) => {
    const [expand, setExpand] = useState(false);
    const uuid: string = props.message.uuid;
    const comment: string = props.message.body;
    const user: string = props.message.user;
    return (
        <div>
            <p>
                <b>{user}</b>
            </p>
            <p>{comment}</p>
            {expand ? <Replies uuid={uuid} /> : null}
            <button type="button" onClick={() => setExpand(!expand)}>
                {expand ? 'collapse' : 'expand'}
            </button>
        </div>
    );
};

export default Thread;
