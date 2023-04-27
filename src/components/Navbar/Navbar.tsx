import { useNavigate } from 'react-router-dom';
import { Dropdown, Modal } from '../../UI/kit';
import classNames from 'classnames';
import './Navbar.sass';
import { useContext, useState } from 'react';
import { Context } from '../..';
import NavbarItem from './NavbarItem';
import { observer } from 'mobx-react-lite';
import { BugReport } from '../Modals/Modals';


const Navbar = ({ hidden = true, closeCallback }: { hidden: boolean, closeCallback: Function }) => {

    const { userStore } = useContext(Context);

    const navigate = useNavigate();

    const [modal, setModal] = useState(false);

    return (
        <nav className={classNames("navbar", { "navbar-closed": hidden })}>
            {
                modal &&
                <Modal close={() => setModal(false)}>
                    <BugReport onClick={() => setModal(false)} />
                </Modal>
            }
            <div className="navbar__list">
                <NavbarItem onClick={closeCallback} text='Закрыть меню' icon='close' />
                <div className="navbar__separator"></div>
                <NavbarItem onClick={closeCallback} text='Главная' icon='home' to='/' />
                <NavbarItem onClick={closeCallback} text='Сообщения' icon='chat' to='/chat' />
                <NavbarItem onClick={closeCallback} text='Поиск' icon='search' to='/search' />
                <NavbarItem onClick={closeCallback} text='Профиль' icon='person' to={`/${userStore.user.nickname}`} />
                <NavbarItem onClick={closeCallback} text='Dashboard' icon='dashboard' to='/dashboard' />
                <div className="navbar__separator navbar__separator-top"></div>
                <Dropdown
                    button={<NavbarItem text='Ещё' icon='menu' />}
                    hover
                    hor='left'
                    items={
                        [
                            {
                                icon: 'darkmode',
                                text: 'Сменить тему',
                                onClick: () => {
                                    const html = document.querySelector('html');
                                    if (html?.getAttribute('theme') === 'light')
                                        html?.setAttribute('theme', 'dark')
                                    else
                                        html?.setAttribute('theme', 'light')
                                }
                            },
                            {
                                icon: 'bugreport',
                                text: 'Сообщение о проблеме',
                                onClick: () => setModal(true)
                            },
                            {
                                icon: 'logout',
                                text: 'Выйти',
                                isDangerous: true,
                                onClick: () => {
                                    userStore.logout().then(() => navigate('/'));
                                }
                            }
                        ]
                    }
                />
            </div>
        </nav >
    )
}

export default observer(Navbar);