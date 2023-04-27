import styles from './Button.module.sass';
import classNames from 'classnames';

interface ButtonProps {
    children: React.ReactNode
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    disabled?: boolean
    round?: boolean
    submit?: boolean
    common?: boolean
    className?: string
    style?: React.CSSProperties
}
const Button: React.FC<ButtonProps> = ({ children, onClick, disabled, round, submit, common, className, style }) => {
    return (
        <button className={
            classNames(className, {
                [styles.submit]: submit,
                [styles.round]: round,
                [styles.common]: common
            })}
            style={style}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}


export default Button;