import './Auth.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useContext, useState } from 'react';
import { Context } from '../../..';


interface IFormInputs {
    email: string
}

const Reset = ({ setPage }: { setPage: Function }) => {

    const { userStore } = useContext(Context);

    const [responseError, setResponseError] = useState<String>('');

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            email: '',
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        userStore.resetPassword(data.email)
            .then(res => res?.status !== 200 ? setResponseError(res) : '');
    };

    return (
        <>
            <div className='Auth__container'>
                <div className="Auth__logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                        <path d="M220 976q-24.75 0-42.375-17.625T160 916V482q0-24.75 17.625-42.375T220 422h70v-96q0-78.85 55.606-134.425Q401.212 136 480.106 136T614.5 191.575Q670 247.15 670 326v96h70q24.75 0 42.375 17.625T800 482v434q0 24.75-17.625 42.375T740 976H220Zm0-60h520V482H220v434Zm260.168-140Q512 776 534.5 753.969T557 701q0-30-22.668-54.5t-54.5-24.5Q448 622 425.5 646.5t-22.5 55q0 30.5 22.668 52.5t54.5 22ZM350 422h260v-96q0-54.167-37.882-92.083-37.883-37.917-92-37.917Q426 196 388 233.917 350 271.833 350 326v96ZM220 916V482v434Z" />
                    </svg>
                </div>
                <h1>Не удаётся войти?</h1>
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
                    <div className="Auth__error">
                        {responseError && responseError}
                    </div>
                    <Button submit disabled={!isValid}>Получить новый пароль</Button>
                    <span className='Auth__separator'>ИЛИ</span>
                    <button onClick={() => setPage('signup')} className='Auth__link'>Создать новый аккаунт</button>
                </form>
            </div>
            <div className="Auth__container">
                <button onClick={() => setPage('signin')} className='Auth__link'>Вернуться к входу</button>
            </div >
        </>
    )
}

export default Reset;