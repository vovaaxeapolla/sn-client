import styles from './Img.module.sass';
import { useState } from 'react';
import { Modal } from '../kit';

interface ImgProps {
    src: string
    alt: string
}

const Img: React.FC<ImgProps> = ({ src, alt }) => {
    const [isFullscreen, setFullsreen] = useState(false);
    return (
        <div className={styles.Img}>
            <img src={src} alt={alt} />
            {isFullscreen &&
                < Modal close={() => 1}>
                    <img src={src} alt={alt} />
                </Modal>
            }
        </div >
    );
}

export default Img;