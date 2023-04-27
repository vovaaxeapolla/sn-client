import './FormInput.sass';
import Icon from '../Icon/Icon';

interface FormInputProps {
    placeholder: string
    type: 'text' | 'password' | 'email'
    onChange?: React.ChangeEventHandler<HTMLInputElement>
    name: string
    value: string
    error?: string;
}

const icons = {
    text: '',
    password: 'lock',
    email: 'email',
}

const FormInput: React.FC<FormInputProps> = ({ type, placeholder, onChange, name, value, error = '' }) => {
    return (
        <div className="FormInput">
            <input type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} />
            <div className="FormInput__placeholder">
                {placeholder}
            </div>
            {error &&
                <div className="FormInput__error">
                    {error}
                </div>
            }
            <div className="FormInput__border"></div>
            <Icon className='FormInput__icon' size='small'>{icons[type]}</Icon>
        </div>
    )
}

export default FormInput;