import './Auth.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useContext, useState } from 'react';
import { Context } from '../../..';
import { observer } from 'mobx-react-lite';

interface IFormInputs {
    email: string
    password: string
}

const Signin = ({ setPage }: { setPage: Function }) => {

    const { userStore } = useContext(Context);

    const [responseError, setResponseError] = useState<String>('');

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        userStore.signin(data.email, data.password)
            .then(res => res?.status !== 200 ? setResponseError(res) : '');
    };

    return (
        <>
            <div className="Auth__container">
                <div className="Auth__logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                        <path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z" />
                    </svg>
                </div>
                <h1>Логин</h1>
                <form className="Auth__form" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Обязательно поле',
                            pattern: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,

                        }}
                        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
                            <FormInput
                                onChange={onChange}
                                value={value}
                                name={name}
                                placeholder="Почта"
                                type="email"
                                error={error && error.message}
                            />
                        }
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Обязательно поле',
                            minLength: { value: 6, message: 'Длина от 6 символов' },
                            maxLength: { value: 32, message: 'Длина до 32 символов' }
                        }}
                        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
                            <FormInput
                                onChange={onChange}
                                value={value}
                                name={name}
                                placeholder="Пароль"
                                type="password"
                                error={error && error.message}
                            />
                        }
                    />
                    <div className="Auth__error">
                        {responseError && responseError}
                    </div>
                    <Button submit disabled={!isValid}>Войти</Button>
                    <button onClick={() => setPage('reset')} className='Auth__link'>Забыли пароль?</button>
                </form>
            </div >
            < div className="Auth__container" >
                У вас ещё нет аккаунта ?
                <button onClick={() => setPage('signup')} className='Auth__link'>Зарегистрироваться</button>
            </div >
        </>
    )
}

export default observer(Signin);