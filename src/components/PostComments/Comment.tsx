import formatDate from "../../utility/fromatDate"
import { Link } from "react-router-dom"
import { IComment } from "../../interfaces/IComment";
import { IMAGES_URL } from "../../http_ws/http";

const Comment: React.FC<IComment> = ({ avatar, nickname, date, text }) => {
    return (
        <div className="PostComments__item">
            <div className="PostComments__item__header">
                <Link to={"/" + nickname}>
                    <img
                        src={IMAGES_URL + '/avatars/' + avatar}
                        alt="avatar"
                        className="PostComments__item__avatar"
                        width='2rem'
                        height='2rem'
                    />
                </Link>
                <Link to={"/" + nickname} className="PostComments__item__nickname">
                    {nickname}
                </Link>
                <p className="PostComments__item__date">{formatDate(date)}</p>
            </div>
            <p className="PostComments__item__text">{text}</p>
        </div>
    );
}

export default Comment;