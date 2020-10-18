import * as React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const WrapperTwo = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    flex-wrap: wrap;
`;

export const ReadyStreamPage: React.FC = () => {
    const { uuid } = useParams();

    const [loading, setLoading] = React.useState(true);
    const [notFound, setNotFound] = React.useState(false);

    const [lectureObj, setLectureObj] = React.useState({} as any);

    React.useEffect(() => {
        const metadataFetch = async () => {
            const response = await fetch(`/api/lecture/${uuid}`);
            if (response.status !== 200) {
                setNotFound(true);
                return;
            }
            setLectureObj(await response.json());
            setLoading(false);
        };

        metadataFetch();
    }, []);

    if (notFound) {
        return (
            <Wrapper>
                <h1>Lecture not found</h1>
            </Wrapper>
        );
    }

    if (loading) {
        return (
            <Wrapper>
                <h1>Loading...</h1>
            </Wrapper>
        );
    }
    return (
        <Wrapper>
            <h2>{lectureObj.name}</h2>
            <WrapperTwo>
                <h1>Ready to stream!</h1>
                <h3>RTMP</h3>
                <code>{`rtmp://localhost:1935/live/${uuid}`}</code>
            </WrapperTwo>
        </Wrapper>
    );
};
