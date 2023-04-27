import './PostList.sass';
import { useEffect, useState } from 'react'
import { PostResponse } from '../../interfaces/response/PostResponse';
import PostService from '../../services/PostService';
import Post from '../Post/Post';
import { Loader } from '../../UI/kit';

const PostList: React.FC = () => {

    const [posts, setPosts] = useState<PostResponse[]>([]);

    useEffect(() => {
        (async () => {
            const posts = await PostService.getAll();
            setPosts(posts.data);
        })();
    }, []);


    return (
        <div className="PostList">
            {
                posts.length > 0 ?
                    posts.map(post => <Post key={post.id} {...{ ...post, setPosts }}></Post>) :
                    <p>Постов ещё нет</p>
            }
        </div>
    );
}

export default PostList;