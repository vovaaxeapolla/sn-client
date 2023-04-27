import { Icon, Loader } from '../../../UI/kit';
import FollowersItem from './FollowersItem';
import { IUser } from '../../../interfaces/IUser';
import { useState, useEffect } from 'react';
import UsersService from '../../../services/UsersService';
import styles from './Followers.module.sass';

interface FollowersProps {
    type: 'followers' | 'followings'
    onClick: Function
    id: string
}

const Followers: React.FC<FollowersProps> = ({ type, onClick, id }) => {

    const [accounts, setAccounts] = useState<IUser[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                let res;
                if (type === 'followers') {
                    res = await UsersService.followers(id);
                } else {
                    res = await UsersService.followings(id);
                }
                setAccounts(res.data);
            } catch (error: any) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [])

    return (
        <div className={styles.Followers}>
            <header className={styles.Followers__header}>
                <h2>{type === 'followers' ? 'Подписчики' : 'Подписки'}</h2>
                <button
                    onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}
                    className={styles.Followers__header__button}
                >
                    <Icon size='medium'>close</Icon>
                </button>
            </header>
            <main className={styles.Followers__main}>
                {
                    !isLoading
                        ?
                        accounts.length > 0
                            ?
                            accounts.map((f: IUser) => <FollowersItem {...f} key={f.nickname} />)
                            :
                            <div className={styles['Followers-empty']}>
                                <h3>{type === 'followers' ? 'Нет подписчиков' : 'Нет подписок'}</h3>
                            </div>
                        :
                        <div className={styles['Followers-empty']}>
                            <Loader />
                        </div>
                }
            </main>
        </div>
    );
}
export default Followers;