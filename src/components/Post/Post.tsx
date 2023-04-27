import { Dropdown, Icon, Slider, Button } from '../../UI/kit';
import { DropdownItem } from '../../UI/Dropdown/Dropdown';
import './Post.sass';
import { PostResponse } from '../../interfaces/response/PostResponse';
import { IMAGES_URL } from '../../http_ws/http';
import PostService from '../../services/PostService';
import { Link } from 'react-router-dom';
import { useContext, memo } from 'react'
import { Context } from '../..';
import PostComments from '../PostComments/PostComments';
import formatDate from '../../utility/fromatDate';

interface PostProps extends PostResponse {
    setPosts: Function
}

const Post: React.FC<PostProps> = ({ nickname, avatar, id, date, text, photos, setPosts }) => {

    const { userStore } = useContext(Context);

    const DropdownItems: DropdownItem[] = [
        {
            icon: 'complaint',
            text: 'Пожаловаться'
        }
    ]

    if (nickname === userStore.user.nickname) {
        DropdownItems.push(
            {
                icon: 'delete',
                isDangerous: true,
                text: 'Удалить',
                onClick: deleteHandler
            }
        )
    }

    async function deleteHandler() {
        const res = await PostService.delete(id);
        if (res.status === 200)
            setPosts((posts: PostResponse[]) => posts.filter(post => post.id !== id));
    }

    return (
        <div className="Post">
            <div className="Post__wrapper">
                <div className="Post__header">
                    <div className="Post__avatar">
                        <Link to={'/' + nickname}>
                            <img src={IMAGES_URL + '/avatars/' + avatar} alt="avatar" />
                        </Link>
                    </div>
                    <div className="Post__userinfo">
                        <Link to={'/' + nickname}>{nickname}</Link>
                        <p className='Post__date'>{formatDate(date)}</p>
                    </div>
                    <Dropdown
                        style={{ marginLeft: 'auto' }}
                        button={<Button round className='Post__dropdown-btn'><Icon size="medium">morehor</Icon></Button>}
                        ver='bottom'
                        hor='right'
                        items={DropdownItems}
                    />
                </div>
                <div className="Post__content">
                    <p>{text}</p>
                    {
                        photos &&
                        (photos.length > 0 &&
                            <Slider imageURL={
                                photos.split(',').map(s => IMAGES_URL + '/photos/' + s)
                            } />)
                    }
                </div>
                <PostComments post_id={id}/>
            </div>
        </div>
    );
}

export default memo(Post);