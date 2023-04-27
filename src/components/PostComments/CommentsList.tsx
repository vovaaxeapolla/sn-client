import { useState, useEffect } from 'react';
import Comment from "./Comment";
import CommentsService from '../../services/CommentsService';
import { IComment } from '../../interfaces/IComment';

const CommentsList = ({ post_id }: { post_id: string }) => {

    const [comments, setComments] = useState<IComment[]>([]);

    useEffect(() => {
        (async () => {
            const res = await CommentsService.getAll(post_id)
            setComments(res.data);
        })();
    }, [])

    return (
        <div className="PostComments__list">
            {comments.map(i => <Comment {...i} />)}
        </div>
    )
}

export default CommentsList;