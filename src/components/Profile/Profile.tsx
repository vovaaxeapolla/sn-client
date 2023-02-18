import './Profile.css';
import Img from '../Img/Img';
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect, useRef, FormEventHandler, FormEvent } from 'react';
import { Context } from '../../index';
import IUser from '../../models/IUser';

const Profile = () => {

    const params = useParams();

    const { userStore } = useContext(Context);

    const [user, setUser] = useState<IUser>();

    const [fetching, setFetching] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [surnname, setSurnme] = useState<string>('');

    const fileInput = useRef<HTMLInputElement>(null);

    async function updateUserInfo() {
        let file = null;
        if (fileInput.current?.files) {
            file = fileInput.current.files[0];
        }
        if (userStore.user.nickname && file)
            userStore.updateUser(userStore.user.nickname, file);
    }

    function inputHandler(e: FormEvent<HTMLDivElement>) {
        // e.currentTarget.textContent;
    }

    useEffect(() => {
        setFetching(false);
        if (params.nickname === userStore.user.nickname) {
            setUser(userStore.user);
            setFetching(true);
        } else {
            const getUser = async () => {
                const result = await fetch(`/user/getuser/${params.nickname}`);
                const data = await result.json();
                setUser(data);
                setFetching(true);
            }
            getUser();
        }
    }, [params]);

    return (
        <div className="profile">
            <div className="profile__wrapper">
                {fetching &&
                    <div className="profile__top">
                        <div className="profile__avatar">
                            <div className='profile__img'>
                                <Img url={`/avatar/${userStore.user.avatar}`} alt="profile__avatar" />
                            </div>
                        </div>
                        <div className="profile__info">
                            <div className='profile__input' onChange={inputHandler}>{user?.name}</div>
                            <div className='profile__input'>{user?.surname}</div>
                        </div>
                        <label htmlFor="postfile" className=''>
                            Выберите файл
                            <input ref={fileInput} hidden type="file" id="postfile" accept="image/png, image/jpeg" />
                        </label>
                        <button onClick={updateUserInfo}>Сохранить</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Profile;