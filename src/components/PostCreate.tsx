import { FC, useRef, useState } from 'react';
import './PostCreate.css';
import Button from '../UI/Button';
import Img from './Img/Img';

interface PostCreateProps {

}

const PostCreate: FC<PostCreateProps> = () => {

    const [isActive, setActive] = useState<boolean>(false);

    const [url, setUrl] = useState<string>('');

    const [text, setText] = useState<string | null>('');

    const fileInput = useRef<HTMLInputElement>(null);

    function fileHandler() {
        if (fileInput.current?.files) {
            const reader = new FileReader();
            reader.onload = function () {
                setUrl(reader.result as string);
            }
            reader.readAsDataURL(fileInput.current.files[0]);
        }
    }

    async function createPost() {

        if (fileInput.current?.files) {
            const formData = new FormData();
            formData.append('text', text ? text : '');
            formData.append('image', fileInput.current.files[0]);
            const result = await fetch(
                '/forum/create', {
                method: 'post',
                body: formData
            });

            const data = await result.text();

        }
    }

    return (
        <div className='postCreate'>
            <div className="postCreate__wrapper">
                <button className='postCreate__button' onClick={() => setActive(!isActive)}>Создать пост</button>
                <div className={"block" + (isActive ? " active" : '')}>
                    <div className='postCreate__input-text' contentEditable onInput={(e) => setText(e.currentTarget.textContent)}></div>
                    <div className="postCreate__controls">
                        <label htmlFor="postfile" className='input-file__label'>
                            Выберите файл
                            <input ref={fileInput} hidden type="file" id="postfile" accept="image/png, image/jpeg" onChange={fileHandler} />
                        </label>
                        <Button onClick={createPost}>Создать</Button>
                    </div>
                    {url && <div className="postCreate__uploaded"><Img url={url} alt={'Загрузка'}></Img></div>}
                </div>
            </div>
        </div>
    );
}

export default PostCreate;