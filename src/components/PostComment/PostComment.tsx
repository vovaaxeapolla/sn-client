import { FC } from 'react';
import IPostComment from '../../models/IPostComment';
import { Link } from 'react-router-dom';
import './PostComment.css';

const PostComment: FC<IPostComment> = ({ text, name, surname, nickname, date }) => {

    const newDate = new Date(date);
    const dateTemplate = `${String(newDate.getDate()).padStart(2, '0')}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${newDate.getFullYear()}`;

    return (
        <div className="comment">
            <div className="comment__header">
                <Link to={`/forum/profile/${nickname}`}>{name + " " + surname}</Link>
                <div className="post__date">{dateTemplate}</div>
            </div>
            <div className='comment__text'>
                {text}
            </div>
            <hr />
        </div>
    );
}

export default PostComment;