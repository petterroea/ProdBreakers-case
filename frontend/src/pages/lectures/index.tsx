import * as React from 'react';
import styled from 'styled-components';

import { Lecture, LectureList } from '../../components/lectureList';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 70%;
    align-items: center;
    justify-content: center;
`;

export const LecturesPage: React.FC = () => {
    const [lectures, setLectures] = React.useState([] as Lecture[]);

    const [loading, setLoading] = React.useState(true);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`/api/lecture/`);
            if (response.status !== 200) {
                return setFailed(true);
            }
            const newList: Lecture[] = [];
            const jsonLectureList = await response.json();
            jsonLectureList.forEach(({ name, end, uuid }: { name: string; end?: Date; uuid: string }) => {
                const lecture = {
                    name: name,
                    isLive: end === undefined,
                    uuid: uuid,
                } as Lecture;
                newList.push(lecture);
            });
            setLectures(newList);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (failed) {
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
            <LectureList lectures={lectures} />
        </Wrapper>
    );
};
