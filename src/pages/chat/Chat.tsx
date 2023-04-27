import { useState, useEffect, useContext } from 'react';
import { Icon, Button, Modal } from '../../UI/kit';
import './Chat.sass';
import { Route, Routes } from 'react-router';
import ChatDialog from './ChatDialog';
import chatService from '../../services/ChatService';
import NewChat from '../../components/Modals/NewChat/NewChat';
import { Context } from '../..';
import { DialogResponse } from '../../interfaces/response/DialogResponse';
import ChatItem from './ChatItem';
import classNames from 'classnames';

interface ChatProps {
    hidden: boolean
    setHidden: Function
    headerRef: React.RefObject<HTMLDivElement>
}

const Chat: React.FC<ChatProps> = ({ hidden, setHidden, headerRef }) => {

    const { userStore } = useContext(Context);
    const [newChat, setNewChat] = useState(false);
    const [chats, setChats] = useState<DialogResponse[]>([]);
    useEffect(() => {
        (async () => {
            const result = await chatService.getDialogs(userStore.user.id);
            setChats(result.data);
        })()
    }, [])

    return (
        <div className="Chat">
            {newChat &&
                <Modal close={() => setNewChat(false)}>
                    <NewChat onClick={() => setNewChat(false)} />
                </Modal>
            }
            <div className={classNames("Chat__left", { "Chat-active": hidden })}>
                {
                    chats.map(c =>
                        <ChatItem
                            key={c.nickname}
                            onClick={() => setHidden(true)}
                            {...c}
                        />)
                }
            </div>
            <div className={classNames("Chat__right", { "Chat-active": !hidden })}>
                <Routes>
                    <Route path="/:id" element={
                        <ChatDialog userId={userStore.user.id} />
                    }
                    />
                    <Route path="/" element={
                        <div className="Chat__default">
                            <div className="Chat__icon">
                                <Icon>send</Icon>
                            </div>
                            <h1>Ваши сообщения</h1>
                            <Button submit onClick={() => setNewChat(true)}>Отправить сообщение</Button>
                            <Button common onClick={() => setHidden(false)} className='Chat-mobile'>Ваши диалоги</Button>
                        </div>
                    }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default Chat;