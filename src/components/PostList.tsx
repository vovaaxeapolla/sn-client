import { useEffect, useState } from "react";
import Post from "./Post";
import './PostList.css';
import IPost from '../models/IPost'


const PostList = () => {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [offset, setOffset] = useState<number>(0);
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        async function request() {
            const result = await fetch(`/forum?limit=5&offset=${offset}`, { credentials: 'include' });
            if (result.status === 200) {
                const data = await result.json();
                setOffset(o => o + 5);
                setPosts(p => [...p, ...data]);
                setFetching(false);
            }
        }
        if (fetching) {
            request();
        }
    }, [fetching])

    function scrollHandler(e: React.UIEvent<HTMLDivElement, UIEvent>) {
        const el = e.target as Element;
        if (el.scrollHeight - (el.scrollTop + window.innerHeight) < 100) {
            setFetching(true);
        }
    }

    return (
        <div className="postlist" onScroll={scrollHandler}>
            {posts.map((p) =>
                <Post
                    key={p.id}
                    {...p}
                />)}
        </div>
    );
}

export default PostList;