import './Settings.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler, ChangeHandler } from "react-hook-form";
import { Context } from '../../..';
import { useContext, useState } from 'react';
interface IFormInputs {
    fullname: string
    nickname: string
}

const Edit = () => {

    const { userStore } = useContext(Context);

    const [responseError, setResponseError] = useState<String>('');

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            fullname: userStore.user.fullname,
            nickname: userStore.user.nickname,
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
        userStore.changePersonalInfo(data.fullname, data.nickname)
            .then(res => res?.status !== 200 ? setResponseError(res) : '');
    };

    return (
        <div className="Settings__container">
            <h1>
                Редактировать профиль
            </h1>
            <form className="Settings__form" onSubmit={handleSubmit(onSubmit)}>
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
                <div className="Settings__error">
                    {responseError && responseError}
                </div>
                <Button submit disabled={!isValid}>Сохранить изменения</Button>
            </form>
        </div>
    )
}

export default Edit;