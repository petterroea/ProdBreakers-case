import React from 'react';

const Thread = (props: any) => {
    const comment: string = props.message.body;
    return <div>{comment}</div>;
};

export default Thread;
