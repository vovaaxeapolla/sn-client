import styles from './Slider.module.sass';
import Icon from '../Icon/Icon';
import { useState } from 'react'
import classNames from 'classnames'

interface SliderProps {
    imageURL: string[]
}

const Slider: React.FC<SliderProps> = ({ imageURL = [''] }) => {
    const [current, setCurrent] = useState(0);
    const [isFullscreen, setFullsreen] = useState(false);
    return (
        <div className={styles.Slider}>
            <div className={styles.Slider__current}>
                {imageURL.length > 1 &&
                    <button
                        className={styles.Slider__prev}
                        onClick={() => setCurrent(p => p - 1 < 0 ? imageURL.length - 1 : p - 1)}
                    >
                        <Icon>arrow_back</Icon>
                    </button>
                }
                <button
                    className={styles.Slider__middle}
                    onClick={() => setFullsreen(p => !p)}>
                    <Icon>fullscreen</Icon>
                </button>
                {imageURL.length > 1 &&
                    <button
                        className={styles.Slider__next}
                        onClick={() => setCurrent(p => (p + 1) % imageURL.length)}
                    >
                        <Icon>arrow_forward</Icon>
                    </button>
                }
                <div className={styles.Slider__current__background}>
                    <img src={imageURL[current]} alt="" />
                </div>
                <img src={imageURL[current]} alt="" />
                <div className={
                    classNames(styles.Slider__fullsreen, {
                        [styles['Slider__fullsreen-opened']]: isFullscreen
                    })}
                    onClick={() => setFullsreen(p => !p)}
                >
                    <img src={imageURL[current]} alt="" />
                </div>
            </div>
            {imageURL.length > 1 &&
                <div className={styles.Slider__container}>
                    {imageURL.map((url, i) => (
                        <div key={i} className={
                            classNames(styles.Slider__image, i === current && styles.Slider__highlighter)}
                            onClick={() => setCurrent(i)}>
                            <img
                                className={styles.Slider__slide}
                                src={url}
                                alt=""
                            />
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Slider;