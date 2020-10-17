import * as React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { User as Person } from '@styled-icons/fa-solid/User';
import { UnlockAlt } from '@styled-icons/fa-solid/UnlockAlt';
import { historyObject as history } from '../../router/historyObject';
import { useDispatch } from 'react-redux';
import { userActions } from '../../state/actions/user';
import { UserRequest } from '../../types';

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

const EmailWrapper = styled.div`
    width: 100%;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.24);
    margin-bottom: 30px;
    color: #000000;
`;

const PasswordWrapper = styled.div`
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
    flex-direction: row-reverse;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 800px) {
        flex-direction: column-reverse;
    }
`;
const LoginButton = styled.button`
    font-size: 16px;
    color: #ffffff;
    background-color: #1565f0;
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

const ToRegisterButton = styled.button`
    font-size: 16px;
    color: #1565f0;
    background-color: #ffffff;
    border: 2px solid #1565f0;
    line-height: 1.2;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-width: 150px;
    height: 50px;
    border-radius: 25px;
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
 * Splash component for greetings useer
 */
export const Login: React.FC = () => {
    const dispatch = useDispatch();

    const validationSchema = React.useMemo(
        () =>
            yup.object({
                username: yup.string().min(2).max(50).required('Username is required'),
                password: yup
                    .string()
                    .min(8)
                    .max(256)
                    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]*/)
                    .required('Password is required'),
            }),
        [],
    );

    const { handleSubmit, register, errors } = useForm({ resolver: yupResolver(validationSchema) });

    const onSubmit = handleSubmit((data) => {
        const user = data as UserRequest;
        dispatch(userActions.login(user));
    });

    const toRegister = (e: React.SyntheticEvent) => {
        e.preventDefault();
        history.push('/register');
    };

    return (
        <>
            <Wrapper>
                <Wrapper2>
                    <LoginForm onSubmit={onSubmit}>
                        <Title>Login</Title>
                        <Errors visible={Object.keys(errors).length !== 0 && errors.constructor === Object}>
                            {errors.username && <Error>{errors.username.message}</Error>}
                            {errors.password && <Error>{errors.password.message}</Error>}
                        </Errors>
                        <EmailWrapper>
                            <span>Username</span>
                            <InputWrapper>
                                <Person size="1em" />
                                <Input name="username" ref={register} tabIndex={1} />
                            </InputWrapper>
                        </EmailWrapper>
                        <PasswordWrapper>
                            <span>Password</span>
                            <InputWrapper>
                                <UnlockAlt size="1em" />
                                <Input name="password" type="password" ref={register} tabIndex={2} />
                            </InputWrapper>
                        </PasswordWrapper>
                        <ButtonsWrapper>
                            <LoginButton type="submit" tabIndex={3}>
                                Login
                            </LoginButton>
                            <ToRegisterButton onClick={toRegister} tabIndex={4}>
                                To Register
                            </ToRegisterButton>
                        </ButtonsWrapper>
                    </LoginForm>
                </Wrapper2>
            </Wrapper>
        </>
    );
};
