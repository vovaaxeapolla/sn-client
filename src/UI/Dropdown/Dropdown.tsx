import styles from './Dropdown.module.sass';
import { useState } from 'react'
import classNames from 'classnames';
import { Icon } from '../kit';

interface DropdownProps {
    hor?: 'left' | 'center' | 'right'
    ver?: 'top' | 'bottom'
    button: React.ReactNode
    hover?: boolean
    items: DropdownItem[]
    style?: React.CSSProperties
}

export interface DropdownItem {
    icon: string
    text: string
    isDangerous?: boolean
    onClick?: Function
}

const Dropdown: React.FC<DropdownProps> = ({ button, style, items, hover = false, hor = 'center', ver = 'top' }) => {

    const [active, setActive] = useState(false);

    return (
        <div className={styles.dropdown} style={style}
            onMouseLeave={hover ? () => setActive(false) : undefined}
            onMouseEnter={hover ? () => setActive(true) : undefined}
        >
            <div onClick={() => setActive(true)}>
                {button}
            </div>
            {
                (active && !hover) &&
                <div
                    className={styles.overlay}
                    onClick={() => setActive(false)}
                />
            }
            {
                active &&
                <div
                    onClick={() => setActive(false)}
                    className={classNames(styles.dropdown__menu, styles[hor], styles[ver])}
                >
                    {
                        items.map(i => (
                            <button
                                key={i.text}
                                onClick={i.onClick && i.onClick as React.MouseEventHandler<HTMLButtonElement>}
                                className={classNames(styles.dropdown__menu__item, { [styles.dangerous]: i.isDangerous })}
                            >
                                <Icon size='small'>{i.icon}</Icon>
                                <p>
                                    {i.text}
                                </p>
                            </button>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Dropdown;