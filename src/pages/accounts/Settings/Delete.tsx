import './Settings.sass';
import { Button, FormInput } from '../../../UI/kit';
import { useForm, Controller, SubmitHandler } from "react-hook-form";

interface IFormInputs {
    password: string
}

const Delete = () => {

    const { handleSubmit, control, formState: { isValid } } = useForm<IFormInputs>({
        defaultValues: {
            password: '',
        },
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<IFormInputs> = data => {
    };

    return (
        <div className="Settings__container">
            <h1>
                Удалить аккаунт
            </h1>
            <form className="Settings__form" onSubmit={handleSubmit(onSubmit)}>
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
                <Button submit onClick={() => 1} disabled={!isValid}>Удалить аккаунт</Button>
            </form>
        </div >
    )
}

export default Delete;