import { Context } from '../..';
import { Icon, Dropdown, Modal, LoaderScreen, Button } from '../../UI/kit';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import UsersService from '../../services/UsersService';
import { IAccount } from '../../interfaces/IAccount';
import AccountService from '../../services/AccountService';
import { observer } from 'mobx-react-lite';
import { ChangeAvatar, FullscreenAvatar } from '../../components/Modals/Modals';
import { DropdownItem } from '../../UI/Dropdown/Dropdown';
import { ErrorResponse } from '../../interfaces/response/ErrorResponse';
import ProfileStats from './ProfileStats';
import './Profile.sass';

const Profile = () => {

    const { nickname = '' } = useParams();
    const { userStore } = useContext(Context);
    const [user, setUser] = useState<IAccount>({} as IAccount);
    const [followed, setFollowed] = useState(false);
    const [error, setError] = useState<ErrorResponse>({} as ErrorResponse);
    const [isLoading, setLoading] = useState(true);
    const [modalChangeAvatar, setModalChangeAvatar] = useState(false);
    const [isFullscreen, setFullsreen] = useState(false);
    const location = useLocation();

    const DropdownItems: DropdownItem[] = [
        {
            icon: 'photo',
            text: 'Открыть фотографию',
            onClick: () => setFullsreen(true)
        }
    ]

    if (user.id === userStore.user.id) {
        DropdownItems.push(
            {
                icon: 'edit',
                text: 'Обновить фотографию',
                onClick: () => setModalChangeAvatar(true)

            },
            {
                icon: 'delete',
                text: 'Удалить фотографию',
                isDangerous: true,
                onClick: async () => {
                    userStore.setUser((await AccountService.deleteAvatar()).data);
                }
            }
        )
    }

    async function follow() {
        const res = await UsersService.follow(user.id);
        if (res.status === 200) {
            setFollowed(true);
        }
    }

    async function unfollow() {
        const res = await UsersService.unfollow(user.id);
        if (res.status === 200) {
            setFollowed(false);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setError({} as ErrorResponse);
                setLoading(true);
                let userResponse = await UsersService.getUser(nickname);
                let followed = await UsersService.following(userResponse.data.id);
                setUser(userResponse.data);
                setFollowed(followed.data);
            } catch (error: any) {
                setError(error.response.data);
            }
            finally {
                setLoading(false);
            }
        })();
    }, [location, userStore.user]);

    return (
        <div className="Profile">
            {isLoading ? <LoaderScreen></LoaderScreen> :
                error.message ? <p>{error.message}</p> :
                    <>
                        {
                            modalChangeAvatar &&
                            <Modal close={() => setModalChangeAvatar(false)}>
                                <ChangeAvatar onClick={() => setModalChangeAvatar(false)} />
                            </Modal>
                        }
                        {
                            isFullscreen &&
                            <Modal close={() => setFullsreen(false)}>
                                <FullscreenAvatar
                                    onClick={() => setFullsreen(p => !p)}
                                    src={`http://localhost:5000/images/avatars/${user.avatar}`}
                                />
                            </Modal>
                        }
                        <div className="Profile__header">
                            <Dropdown
                                button={
                                    <div className="Profile__avatar">
                                        <img
                                            src={`http://localhost:5000/images/avatars/${user.avatar}`}
                                            alt="avatar"
                                        />
                                    </div>
                                }
                                hover
                                ver='bottom'
                                items={DropdownItems}
                            />
                            <div>
                                <div className="Profile__top">
                                    <h1>{user.nickname}</h1>
                                    {
                                        user.id === userStore.user.id ?
                                            <Link className="Profile__top__settings" to={'/accounts/settings/edit'}>
                                                <Icon className='Profile__gear' size='medium'>gear</Icon>
                                            </Link>
                                            :
                                            followed
                                                ?
                                                <Button onClick={unfollow} common className="Profile__top__settings">
                                                    Отписаться
                                                </Button>
                                                :
                                                <Button onClick={follow} submit className="Profile__top__settings">
                                                    Подписаться
                                                </Button>


                                    }
                                </div>
                                <ProfileStats id={user.id} />
                                <div className="Profile__bottom">
                                    <h3>{user.fullname}</h3>
                                </div>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default observer(Profile);