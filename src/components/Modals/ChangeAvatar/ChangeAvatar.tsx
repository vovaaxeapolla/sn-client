import { useState, useContext, useRef } from 'react';
import AccountService from '../../../services/AccountService';
import { Context } from '../../..';
import { Button, Icon } from '../../../UI/kit';
import styles from './ChangeAvatar.module.sass';

interface ChangeAvatarProps {
    onClick: Function
}

const ChangeAvatar: React.FC<ChangeAvatarProps> = ({ onClick }) => {

    const [dragAvatar, setDragAvatar] = useState(false);
    const { userStore } = useContext(Context);
    const avatarRef = useRef<HTMLInputElement>(null);

    function dragStartHandler(e: any) {
        e.preventDefault();
        setDragAvatar(true);
    }

    function dragLeaveHandler(e: any) {
        e.preventDefault();
        setDragAvatar(false);
    }

    async function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setDragAvatar(false);
        let files = [...e.dataTransfer.files];
        const avatar = new FormData();
        avatar.append('avatar', files[0]);
        userStore.setUser((await AccountService.changeAvatar(avatar)).data);
    }

    async function onInputHandler() {
        if (avatarRef.current?.files) {
            const files = avatarRef.current.files;
            const avatar = new FormData();
            avatar.append('avatar', files[0]);
            userStore.setUser((await AccountService.changeAvatar(avatar)).data);
        }
    }

    return (
        <div className={styles.ChangeAvatar}>
            {
                dragAvatar ?
                    <div className={styles['ChangeAvatar__drag-area']}>
                        <div
                            className={styles["ChangeAvatar__drag-area__zone"]}
                            onDragStart={e => dragStartHandler(e)}
                            onDragLeave={e => dragLeaveHandler(e)}
                            onDragOver={e => dragStartHandler(e)}
                            onDrop={e => onDropHandler(e)}>
                            Перетащите фотографию
                        </div>
                    </div>
                    :
                    <div
                        className={styles.ChangeAvatar__wrapper}
                        onDragStart={e => dragStartHandler(e)}
                        onDragLeave={e => dragLeaveHandler(e)}
                        onDragOver={e => dragStartHandler(e)}
                    >
                        <div className={styles.ChangeAvatar__header}>
                            <p>Загрузка новой фотографии</p>
                            <button onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>
                                <Icon size='small'>close</Icon>
                            </button>
                        </div>
                        <div className={styles.ChangeAvatar__body}>
                            Друзьям будет проще узнать вас, если вы загрузите свою настоящую фотографию.
                            <br></br>Вы можете загрузить изображение в формате JPG, GIF или PNG.
                            <input
                                type="file"
                                name='avatar'
                                style={{ display: 'none' }}
                                ref={avatarRef}
                                accept=".png,.jpg,.jpeg"
                                onChange={onInputHandler}
                            />
                            <Button submit onClick={() => avatarRef.current?.click()}>
                                Загрузить аватар
                            </Button>
                        </div>
                        <div className={styles.ChangeAvatar__footer}>
                            Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера.
                        </div>
                    </div>
            }
        </div>
    );
}
export default ChangeAvatar;