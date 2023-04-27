import PostCreate from "../../components/PostCreate/PostCreate";
import './Feed.sass';
import PostList from "../../components/PostList/PostList";

const Feed = () => {
    return (
        <div className="Feed">
            <PostCreate />
            <PostList />
        </div>
    );
}

export default Feed;