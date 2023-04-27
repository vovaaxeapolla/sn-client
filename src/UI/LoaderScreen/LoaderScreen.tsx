import styles from './LoaderScreen.module.sass';

const LoaderScreen = () => {
    return (
        <div className={styles.Loader}>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
            <div className={styles.dots}></div>
        </div>
    )
}

export default LoaderScreen;