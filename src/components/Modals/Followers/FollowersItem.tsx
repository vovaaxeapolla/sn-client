import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../../http_ws/http';
import { IUser } from '../../../interfaces/IUser';
import styles from './Followers.module.sass';

const FollowersItem: React.FC<IUser> = ({ avatar, nickname, fullname }) => {
    return (
        <div className={styles.Followers__item}>
            <Link to={'/' + nickname} className={styles.Followers__name}>
                <img src={IMAGES_URL + '/avatars/' + avatar} alt="avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                    <p className={styles.Followers__nickname}>{nickname}</p>
                    <p className={styles.Followers__fullname}>{fullname}</p>
                </div>
            </Link>
            {/* <Button common>
                Удалить
            </Button> */}
        </div>
    );
}

export default FollowersItem;