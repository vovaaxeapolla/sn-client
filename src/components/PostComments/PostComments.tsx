import { ContentEditable, Icon } from '../../UI/kit';
import { useState } from 'react'
import CommentsList from './CommentsList';
import './PostComments.sass';
import CommentsService from '../../services/CommentsService';

const PostComments = ({ post_id }: { post_id: string }) => {

    const [value, setValue] = useState<string>('');
    const [cOpened, setCOpened] = useState(false);

    function send() {
        CommentsService.create(post_id, value);
        setValue('');
    };

    return (
        <div className="PostComments">
            {cOpened && <CommentsList post_id={post_id} />}
            <button onClick={() => setCOpened(p => !p)}>{cOpened ? 'Закрыть' : 'Комментарии...'}</button>
            <div className="PostComments__wrapper">
                {/* <ContentEditable
                    className="PostComments__input"
                    placeholder="Добавить комментарий..."
                /> */}
                {value &&
                    <button className="PostComments__send" onClick={send}>
                        <Icon>send</Icon>
                    </button>
                }
            </div>
        </div >
    );
}

export default PostComments;