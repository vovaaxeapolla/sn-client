import { FC, useState, useRef } from 'react';
import './Post.css';
import IPost from '../models/IPost';
import IPostComment from '../models/IPostComment';
import Img from './Img/Img';
import { Link } from 'react-router-dom';
import PostComment from './PostComment/PostComment';

const Post: FC<IPost> = ({ id, date, text, image, name, surname, nickname, avatar }) => {

    const newDate = new Date(date);
    const dateTemplate = `${String(newDate.getDate()).padStart(2, '0')}.${String(newDate.getMonth() + 1).padStart(2, '0')}.${newDate.getFullYear()}`;
    const [comments, setComments] = useState<IPostComment[]>([])
    const [isComment, setIsComment] = useState<boolean>(false);
    const input = useRef<HTMLDivElement>(null);

    async function sendComment() {
        const result = await fetch(
            '/forum/addcomment', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postid: id, text: input?.current?.textContent })
        })
    }

    async function getComments() {
        if (!isComment) {
            setIsComment(true);
            const result = await fetch(`/forum/comments/${id}`);
            const data = await result.json();
            setComments(data);
        } else {
            setIsComment(false);
        }

    }

    return (
        <div className='post'>
            <header className='post__header'>
                <div className="post__profile-picture">
                    <Img url={`/avatar/${avatar}`} alt="profile__avatar" />
                </div>
                <div className="post__info">
                    <div className="post__profile-name">
                        <Link to={`/forum/profile/${nickname}`}>{name + " " + surname}</Link>
                    </div>
                    <div className="post__date">{dateTemplate}</div>
                </div>
            </header>
            <div className='post__content'>
                <div className="post__text">{text}</div>
                <div className="post__pictures">
                    {image && <Img url={"/photo/" + image} alt='image'></Img>}
                </div>
            </div>
            <div className="post__comments">
                <button className='post__button-comments' onClick={getComments}>Комментарии...</button>
                {isComment && comments.map(c => <PostComment key={c.id} {...c}></PostComment>)}
                <div className="post__comments__input">
                    <div ref={input} className="post__input" contentEditable data-placeholder='Напишите комментарий...'></div>
                    <button className='post__button' onClick={sendComment} ></button>
                </div>
            </div>
        </div>
    );
}

export default Post;