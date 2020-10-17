import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Blackboard } from '@styled-icons/entypo/Blackboard';
import { Description } from '@styled-icons/material-rounded/Description';
import { historyObject as history } from '../../router/historyObject';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/reducers';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
`;

const Errors = styled.div<{ visible: boolean }>`
    display: ${(props) => (props.visible ? 'block' : 'none')};
    border: 1px solid #ff073a;
    margin-bottom: 5px;
    padding: 10px;
`;

const Error = styled.div`
    &:not(:last-child)  {
        border-bottom: 1px solid #ccc;
        padding-bottom: 5px;
        margin-bottom: 5px;
    }
`;

const Wrapper2 = styled.div`
    width: 500px;
    overflow: hidden;
    padding: 55px 55px 37px 55px;
    background-color: #ffffff;
    -webkit-box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
    box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
    border-radius: 5px;
    display: flex;
    @media only screen and (max-width: 800px) {
        display: block;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
    }
`;

const LoginForm = styled.form`
    width: 100%;
`;

const Title = styled.h1`
    font-size: 30px;
    color: #000000;
    line-height: 1.2;
    text-align: left;
    text-transform: uppercase;
    display: block;
`;

const NameWrapper = styled.div`
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    margin-bottom: 30px;
    color: #000000;
`;

const DescriptionWrapper = styled.div`
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    margin-bottom: 30px;
    color: #000000;
`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ButtonsWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    @media only screen and (max-width: 800px) {
        flex-direction: column-reverse;
    }
`;
const Button = styled.button`
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
    background-color: #0dd148;
    font-weight: bold;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 150px;
    height: 50px;
    border-radius: 25px;
    border: none;
    @media only screen and (max-width: 800px) {
        width: 100%;
        margin-bottom: 10px;
    }
`;

const Input = styled.input`
    font-size: 16px;
    color: #000000;
    line-height: 1.2;
    display: block;
    width: 100%;
    height: 45px;
    background: transparent;
    padding: 0 5px 0 38px;
    border: none;
    outline: none;
`;

/*
 * New Stream component
 */
export const NewStream: React.FC = () => {
    const authSelector = useSelector((state: RootStateType) => state.authentication);

    const validationSchema = React.useMemo(
        () =>
            yup.object({
                name: yup.string().min(2).max(256).required('Name is required'),
                description: yup.string().min(2).max(256).required('Description is required'),
            }),
        [],
    );

    const { handleSubmit, register, errors } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = handleSubmit(async (data) => {
        console.log(authSelector);
        const response = await fetch('/api/lecture', {
            method: 'PUT',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${authSelector && authSelector.user && authSelector.user.token}`,
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({
                ...data,
                start: new Date(),
                end: new Date(),
            }),
        });

        // If response is OK then return result
        if (response.ok && response.status === 200) {
            const data: {
                description: string;
                end: string;
                name: string;
                start: string;
                uuid: string;
            } = await response.json();

            history.push(`/stream/${data.uuid}`);
        }
    });

    return (
        <>
            <Wrapper>
                <Wrapper2>
                    <LoginForm onSubmit={onSubmit}>
                        <Title>New Lecture</Title>
                        <Errors visible={Object.keys(errors).length !== 0 && errors.constructor === Object}>
                            {errors.name && <Error>{errors.name.message}</Error>}
                            {errors.description && <Error>{errors.description.message}</Error>}
                        </Errors>
                        <NameWrapper>
                            <span>Name</span>
                            <InputWrapper>
                                <Blackboard size="1.5em" />
                                <Input name="name" ref={register} />
                            </InputWrapper>
                        </NameWrapper>
                        <DescriptionWrapper>
                            <span>Description</span>
                            <InputWrapper>
                                <Description size="1.5em" />
                                <Input name="description" type="text" ref={register} />
                            </InputWrapper>
                        </DescriptionWrapper>
                        <ButtonsWrapper>
                            <Button type="submit">Register</Button>
                        </ButtonsWrapper>
                    </LoginForm>
                </Wrapper2>
            </Wrapper>
        </>
    );
};
