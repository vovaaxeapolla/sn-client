import { IMAGES_URL } from '../../../http_ws/http';
import { Button } from '../../../UI/kit';
import { IUser } from '../../../interfaces/IUser';
import styles from './NewChat.module.sass';
import { useNavigate } from 'react-router';
import ChatService from '../../../services/ChatService';

interface NewChatItemProps extends IUser {
    close: Function
}

const NewChatItem: React.FC<NewChatItemProps> = ({ avatar, nickname, fullname, close }) => {

    const navigation = useNavigate();

    async function openChat() {
        const result = await ChatService.createChat(nickname);
        navigation('/chat/' + result.data.chatId);
        close();
    }

    return (
        <div className={styles.NewChat__item}>
            <div className={styles.NewChat__name}>
                <img src={IMAGES_URL + '/avatars/' + avatar} alt="avatar" />
                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '1rem' }}>
                    <p className={styles.Followers__nickname}>{nickname}</p>
                    <p className={styles.Followers__fullname}>{fullname}</p>
                </div>
            </div>
            <Button common onClick={openChat}>Написать</Button>
        </div>
    );
}

export default NewChatItem;