import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { Context } from '../../index';
import './Auth.css';

const Auth = () => {

    document.title = 'Авторизация';

    const { userStore } = useContext(Context);

    const navigator = useNavigate();

    const [checked, setChecked] = useState(true);

    async function loginHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const { email, password } = formJson as { email: string, password: string };
        await userStore.login(email, password);
        if (userStore.auth) {
            navigator('/forum');
        }
    }

    async function signupHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const { email, password, passwordagain, name, surname } = formJson as { email: string, password: string, passwordagain: string, name: string, surname: string };
        if (password === passwordagain) {
            await userStore.signup(email, password, name, surname);
        } else {
            console.log('пароли не совпали');
        }
        if (userStore.auth) {
            navigator('/forum');
        }
    }

    async function logoutHandler() {
        await userStore.logout();
        navigator('/auth');
    }

    return (
        <div className="auth">
            <div className="forumForm">
                <header>
                    <h1>Forum</h1>
                </header>
                {localStorage.getItem('isAuth') === 'true' ?
                    <>
                        <button className="auth__btn-submit auth__input" onClick={() => navigator('/forum')}>Продолжить</button>
                        <button className="auth__btn-submit auth__input" onClick={logoutHandler}>Выйти</button>
                    </>
                    :
                    <>
                        <div className="forumForm__switch">
                            <div className={"forumForm__thumb" + (checked ? ' forumForm__thumb-checked' : '')}></div>
                            <button className={"forumForm__button" + (checked ? ' forumForm__button-active' : '')} onClick={() => setChecked(true)}>Вход</button>
                            <button className={"forumForm__button" + (checked ? '' : ' forumForm__button-active')} onClick={() => setChecked(false)}> Регистрация</button>
                        </div>
                        <form method="post" onSubmit={checked ? loginHandler : signupHandler} className="auth__form">
                            <input
                                type="email"
                                name="email"
                                placeholder="Логин"
                                className="auth__input"
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Пароль"
                                className="auth__input"
                            />
                            {
                                !checked &&
                                <>
                                    <input
                                        type="password"
                                        name="passwordagain"
                                        placeholder="Повторите пароль"
                                        className="auth__input"
                                    />
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Имя"
                                        className="auth__input"
                                    />
                                    <input
                                        type="text"
                                        name="surname"
                                        placeholder="Фамилия"
                                        className="auth__input"
                                    />
                                </>
                            }
                            <button type="submit" className="auth__btn-submit auth__input">{checked ? "Войти" : "Регистрация"}</button>
                        </form>
                    </>
                }
            </div>
        </div >
    )
}

export default Auth;