import './PostCreate.sass';
import readFiles from '../../utility/readFiles';
import { useRef, useState, createRef } from 'react';
import { Icon, ContentEditable } from '../../UI/kit';
import PostService from '../../services/PostService';

const PostCreate = () => {

    const fileInput = useRef<HTMLInputElement>(null);
    const postCreateBox = useRef<HTMLInputElement>(null);
    const [filesURL, setUrls] = useState<string[]>([]);

    async function send(e: React.MouseEvent) {
        e.preventDefault();
        const form = new FormData();
        if (postCreateBox.current || fileInput.current) {
            let flag = false;
            if (postCreateBox.current?.textContent) {
                form.append('text', postCreateBox.current.textContent);
                flag = true;
            }
            if (fileInput?.current?.files?.length) {
                for (let i = 0; i < fileInput.current.files.length; i++) {
                    form.append('photos', fileInput.current.files[i]);
                }
                flag = true;
            }
            if (flag) {
                await PostService.create(form);
                if (postCreateBox.current)
                    postCreateBox.current.textContent = null
                if (fileInput.current)
                    fileInput.current.files = null;
                setUrls([]);
            }
        }
    }

    function fileHandler() {
        if (fileInput.current?.files) {
            const files = fileInput.current.files;
            if (files.length <= 8) {
                readFiles(files, setUrls);
            }
        }
    }

    return (
        <div className="PostCreate">
            <div className="PostCreate__wrapper">
                <div className="PostCreate__form">
                    <div className="PostCreate__wrapper-input">
                        <div className="PostCreate__top">
                            <label className="PostCreate__label PostCreate__attach">
                                <Icon>attach_file</Icon>
                                <input
                                    onChange={fileHandler}
                                    ref={fileInput}
                                    type="file"
                                    multiple
                                    accept=".png,.jpg,.jpeg"
                                />
                            </label>
                            <ContentEditable
                                ref={postCreateBox}
                                className="PostCreate__input"
                                placeholder="Что у вас нового?"
                            />
                        </div>
                        {
                            filesURL.length > 0
                            &&
                            <div className="PostCreate__uploaded__wrapper">
                                {filesURL.map((url, i) => {
                                    return (
                                        <div className="PostCreate__uploaded" key={i}>
                                            <div className="PostCreate__picture__controlls">
                                                <button onClick={() => {
                                                    if (fileInput.current?.files) {
                                                        fileInput.current.value = "";
                                                    }
                                                    setUrls(filesURL.filter(u => u !== url))
                                                }
                                                }>
                                                    <Icon size='large'>
                                                        delete
                                                    </Icon>
                                                </button>
                                            </div>
                                            <img src={url} alt={'Загрузка'} width="100%" height="100%" />
                                        </div>)
                                })}
                            </div>
                        }
                    </div>

                    <button className="PostCreate__submit PostCreate__label PostCreate__send"
                        onClick={send}
                    >
                        <Icon>send</Icon>
                    </button>
                </div>
            </div>
        </div >
    );
}

export default PostCreate;