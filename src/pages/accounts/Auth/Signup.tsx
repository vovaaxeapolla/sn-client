import './Auth.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState, useContext } from 'react';
import { Context } from '../../..';

interface IFormInputs {
    email: string
    fullname: string
    nickname: string
    password: string
}

const Signup = ({ setPage }: { setPage: Function }) => {

    const { userStore } = useContext(Context);

    const [responseError, setResponseError] = useState<String>('');

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            email: '',
            fullname: '',
            nickname: '',
            password: ''
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        userStore.signup(data.email, data.fullname, data.nickname, data.password)
            .then(res => res?.status !== 200 ? setResponseError(res) : '');
    };

    return (
        <>
            <div className="Auth__container">
                <form className="Auth__form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="Auth__logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                            <path d="M730 656V526H600v-60h130V336h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40 896v-94q0-35 17.5-63.5T108 696q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420 636 478 649.5 536 663 611 696q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587 750q-71-33-120-43.5T360 696q-58 0-107.5 10.5T132 750q-15 7-23.5 21.5T100 802v34Zm260-321q39 0 64.5-25.5T450 425q0-39-25.5-64.5T360 335q-39 0-64.5 25.5T270 425q0 39 25.5 64.5T360 515Zm0-90Zm0 411Z" />
                        </svg>
                    </div>
                    <h1>Регистрация</h1>
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
                        name="fullname"
                        control={control}
                        rules={{
                            required: 'Обязательно поле',
                            maxLength: { value: 32, message: 'Длина до 32 символов' }
                        }}
                        render={({ field: { onChange, value, name }, fieldState: { error } }) =>
                            <FormInput
                                onChange={onChange}
                                value={value}
                                name={name}
                                placeholder="Имя и фамилия"
                                type="text"
                                error={error && error.message}
                            />
                        }
                    />
                    <Controller
                        name="nickname"
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
                                placeholder="Имя пользователя"
                                type="text"
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
                    <Button submit disabled={!isValid}>Зарегистрироваться</Button>
                </form>
            </div>
            <div className="Auth__container">
                Есть аккаунт?
                <button onClick={() => setPage('signin')} className='Auth__link'>Вход</button>
            </div>
        </>
    )
}

export default Signup;