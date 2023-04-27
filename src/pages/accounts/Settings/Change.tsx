import './Settings.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useContext, useState } from 'react';
import { Context } from '../../..';

interface IFormInputs {
    oldPassword: string
    newPassword: string
    confirmPassword: string
}

const Change = () => {

    const { userStore } = useContext(Context);

    const [responseError, setResponseError] = useState<String>('');

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmPassword: ''
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        if (data.newPassword !== data.confirmPassword)
            setResponseError('Пароли не совпадают');
        else
            userStore.changePassword(data.oldPassword, data.newPassword)
                .then(res => res?.status !== 200 ? setResponseError(res) : '');
    };

    return (
        <div className="Settings__container">
            <h1>
                Редактировать профиль
            </h1>
            <form className="Settings__form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="oldPassword"
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
                            placeholder="Старый пароль"
                            type="password"
                            error={error && error.message}
                        />
                    }
                />
                <Controller
                    name="newPassword"
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
                            placeholder="Новый пароль"
                            type="password"
                            error={error && error.message}
                        />
                    }
                />
                <Controller
                    name="confirmPassword"
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
                            placeholder="Подтвердите новый пароль"
                            type="password"
                            error={error && error.message}
                        />
                    }
                />
                <div className="Settings__error">
                    {responseError && responseError}
                </div>
                <Button submit disabled={!isValid}>Сохранить изменения</Button>
            </form>
        </div>
    )
}

export default Change;