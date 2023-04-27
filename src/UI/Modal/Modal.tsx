import ReactDOM from "react-dom";
import styles from './Modal.module.sass';
const modalRoot = document.getElementById('modals');

interface ModalProps {
    children: React.ReactNode
    close?: Function
}

const Modal: React.FC<ModalProps> = ({ children, close }) => {
    return ReactDOM.createPortal(
        (
            <div
                className={styles.Modal}
                onClick={close as React.MouseEventHandler<HTMLDivElement>}
            >
                <div onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        ),
        modalRoot as HTMLElement
    );
}

export default Modal;