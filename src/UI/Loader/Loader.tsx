import styles from './Loader.module.sass';

const Loader: React.FC = () => {
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

export default Loader;