import "./Button.css";
import { ReactNode, FC, MouseEventHandler } from "react"

interface ButtonProps {
    children?: ReactNode
    onClick?: MouseEventHandler
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="btn">
            {children}
        </button>
    )
}

export default Button;