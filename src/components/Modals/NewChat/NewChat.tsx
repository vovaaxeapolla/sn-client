import { Button, Icon } from '../../../UI/kit';
import useDebounce from '../../../hooks/useDebounce';
import { IUser } from '../../../interfaces/IUser';
import styles from './NewChat.module.sass';
import NewChatItem from './NewChatItem';
import ChatService from '../../../services/ChatService';
import { useState, useEffect } from 'react';

interface NewChatProps {
    onClick: Function
}

const NewChat: React.FC<NewChatProps> = ({ onClick }) => {

    const [search, setSearch] = useState('');

    const debouncedValue = useDebounce(search, 500)

    const [account, setAccounts] = useState<IUser[]>([]);


    useEffect(() => {
        (async () => {
            const data = await ChatService.accounts(debouncedValue);
            setAccounts([...data.data]);
        })()
    }, [debouncedValue])

    return (
        <div className={styles.NewChat}>
            <header className={styles.NewChat__header}>
                <h2 style={{ width: '100%', height: '100%', position: 'absolute' }}>
                    Новое сообщение
                </h2>
                <button style={{ marginLeft: 'auto', marginRight: '1rem' }} onClick={onClick as React.MouseEventHandler<HTMLButtonElement>}>
                    <Icon size='medium'>close</Icon>
                </button>
            </header>
            <div className={styles.NewChat__search}>
                <h3>Кому:</h3>
                <input
                    type='search'
                    placeholder='Поиск...'
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className={styles.NewChat__accounts}>
                {
                    account.length > 0
                        ?
                        account.map((acc: IUser) =>
                            <NewChatItem {...acc} key={acc.nickname} close={onClick} />
                        )
                        :
                        <div className={styles['NewChat-empty']}>
                            <h3>Нет совпадений</h3>
                        </div>
                }
            </div>
        </div>
    );
}
export default NewChat;