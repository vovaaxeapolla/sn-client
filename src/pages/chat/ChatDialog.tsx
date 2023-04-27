import { useState, useEffect, useRef } from "react";
import ChatService from '../../services/ChatService';
import { useParams } from "react-router";
import { IMessage } from "../../interfaces/IMessage";
import ChatHeader from "./ChatHeader";
import MessagesGroup from "./MessagesGroup";
import { DialogResponse } from "../../interfaces/response/DialogResponse";
import { ContentEditable, Icon, Loader } from "../../UI/kit";

const sendMsg = (id: string | undefined, value: string) => {
    if (!id)
        return '';
    ChatService.sendMessage(id, value);
}

interface ChatDialogProps {
    userId: string
}

const ChatDialog: React.FC<ChatDialogProps> = ({ userId }) => {

    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const inputBox = useRef<HTMLDivElement>(null);
    const messageBox = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [user, setUser] = useState<DialogResponse>({} as DialogResponse);
    const [controller, setController] = useState<AbortController>(new AbortController());

    const getChat = async () => {
        if (!id)
            return
        const res = await ChatService.getDialog(id);
        setUser(res.data);
    }

    const getMsg = async () => {
        if (!id)
            return;
        try {
            const res = await ChatService.getMessage(id, controller.signal);
            setMessages(p => [...p, res.data]);
            getMsg();
        } catch (error) {
            
        }
    }

    const getHistory = async () => {
        setLoading(true)
        if (!id)
            return
        const msgs = await ChatService.getHistory(id, 0);
        setMessages(p => [...p, ...msgs.data]);
        setLoading(false);
    }

    const handleSubmit = () => {
        if (inputBox?.current?.textContent) {
            sendMsg(id, inputBox.current.textContent.trim());
            inputBox.current.textContent = null;
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key) {
            case 'Enter':
                e.preventDefault();
                handleSubmit();
                inputBox.current?.focus();
                break;

            default:
                break;
        }
    }

    useEffect(() => {
        setController(new AbortController());
        setMessages([]);
        getChat();
        getMsg();
        getHistory();
        return () => {
            controller.abort();
        }
    }, [id])

    useEffect(() => {
        if (!loading)
            messageBox?.current?.scrollIntoView();
    }, [messages]);

    return (
        <div className="ChatDialog">
            {!loading && <ChatHeader user={user} />
            }

            <div className="ChatDialog__main">
                {!loading ?
                    <MessagesGroup userId={userId} messages={messages} />
                    :
                    <Loader />
                }
                <div className="ChatDialog__messages-anchor" ref={messageBox} />
            </div >
            <div className="ChatDialog__bottom">
                <ContentEditable
                    ref={inputBox}
                    onKeyDown={handleKeyDown}
                    className="ChatDialog__input"
                    placeholder="Ваше сообщение..."
                />
                <button className="ChatDialog__submit" onClick={handleSubmit}>
                    <Icon>send</Icon>
                </button>
            </div>
        </div >
    );

}

export default ChatDialog;