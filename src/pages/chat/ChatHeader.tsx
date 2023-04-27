import { Link } from "react-router-dom";
import { IMAGES_URL } from "../../http_ws/http";
import { DialogResponse } from "../../interfaces/response/DialogResponse";

const ChatHeader = ({ user }: { user: DialogResponse }) => {

    return (
        <header className="ChatDialog__header">
            <Link to={'/' + user.nickname} style={{ display: 'flex', alignItems: 'center' }}>
                <img src={IMAGES_URL + '/avatars/' + user.avatar} alt="avatar" />
                <p style={{ marginLeft: '1rem' }}>{user.nickname}</p>
            </Link>
        </header>
    )
}

export default ChatHeader;