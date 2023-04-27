import './Navbar.sass';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../UI/kit';

interface NavbarItemProps {
    onClick?: Function
    text: string,
    icon: string,
    to?: string
}

const NavbarItem: React.FC<NavbarItemProps> = ({ onClick, text, icon, to }) => {
    return (
        <div onClick={onClick as React.MouseEventHandler<HTMLDivElement>} className="navbar__item">
            {
                to
                    ?
                    <NavLink className="navbar__link" to={to} >
                        {({ isActive }) => {
                            return (
                                <>
                                    <Icon className='navbar__icon'>{isActive ? icon + '_fill' : icon}</Icon>
                                    <p>{text}</p>
                                </>
                            );
                        }}
                    </NavLink>
                    :
                    <button className="navbar__link">
                        <Icon className='navbar__icon'>{icon}</Icon>
                        <p>{text}</p>
                    </button>
            }
        </div>
    );
}

export default NavbarItem;