import './Settings.sass';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';
import Edit from './Edit';
import Delete from './Delete';
import Change from './Change';
import classNames from 'classnames';

const Settings = ({ hidden = true, closeCallback }: { hidden: boolean, closeCallback: Function }) => {
    return (
        <div className="Settings">
            <div className={classNames("Settings__navbar", { "Settings__navbar-closed": hidden })}>
                <button
                    className='Settings__navbar__link'
                    onClick={() => closeCallback()}>
                    Закрыть меню
                </button>
                <NavLink
                    className={({ isActive }) => isActive ? "Settings__navbar__link Settings__navbar__link-active" : "Settings__navbar__link"}
                    to={'/accounts/settings/edit'}
                    onClick={() => closeCallback()}>
                    Редактировать профиль
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "Settings__navbar__link Settings__navbar__link-active" : "Settings__navbar__link"}
                    to={'/accounts/settings/password/change'}
                    onClick={() => closeCallback()}>
                    Сменить пароль
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? "Settings__navbar__link Settings__navbar__link-active" : "Settings__navbar__link"}
                    to={'/accounts/settings/delete'}
                    onClick={() => closeCallback()}>
                    Удалить аккаунт
                </NavLink>
            </div>
            <Routes>
                <Route path='edit' element={<Edit />} />
                <Route path='password/change' element={<Change />} />
                <Route path='delete' element={<Delete />} />
            </Routes>
        </div >
    );
}

export default Settings;