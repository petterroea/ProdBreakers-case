import * as React from 'react';
import styled from 'styled-components';

interface StyledElementProps {
    selected: boolean;
}

const Element = styled.div<StyledElementProps>`
    color: ${(props) => (props.selected ? '#6FE9FF' : 'white')};
    border-bottom: solid 4px ${(props) => (props.selected ? '#6FE9FF' : 'transparent')};
    font-weight: bold;
    font-size: 22px;
    line-height: 31px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    user-select: none;

    &:not(:last-child) {
        margin-right: 80px;
    }

    @media screen and (max-width: 1100px) {
        &:not(:last-child) {
            margin-right: 40px;
        }

        margin-right: 40px;
    }

    @media screen and (max-width: 800px) {
        font-size: 16px;

        &:not(:last-child) {
            margin-right: 15px;
        }

        margin-right: 15px;
    }
`;

const Center = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Text = styled.span`
    margin-left: 10px;
`;

interface NavElementProps {
    text: string;
    selected: boolean;
    location: string;
    onClick: (location: string) => void;
}

/**
 * Navigation element for the Navigation bar.
 */
export const NavigationElement: React.FC<NavElementProps> = (props) => {
    // Calls the onClick from props that changes the location.
    const onClick = () => {
        props.onClick(props.location);
    };

    return (
        <Element selected={props.selected} onClick={onClick}>
            <Center>
                <Text>{props.text}</Text>
            </Center>
        </Element>
    );
};
