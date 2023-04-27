import { NavLink } from "react-router-dom";
import { IMAGES_URL } from "../../http_ws/http";
import formatDate from "../../utility/fromatDate";

interface ChatItemProps {
    id: string
    date: number
    text: string
    nickname: string
    avatar: string
    onClick?: Function
}

const ChatItem: React.FC<ChatItemProps> = ({ id, date, text, avatar, nickname, onClick }) => {
    return (
        <NavLink to={'/chat/' + id} className="ChatItem" onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}>
            <img src={IMAGES_URL + '/avatars/' + avatar} alt="avatar" />
            <div className="ChatItem__middle">
                <p>{nickname}</p>
                <p className="ChatItem__msg">{text}</p>
            </div>
            <p className="ChatItem__date">{formatDate(date)}</p>
        </NavLink>
    );
}

export default ChatItem;