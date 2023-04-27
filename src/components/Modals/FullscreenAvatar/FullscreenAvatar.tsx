import styles from './FullscreenAvatar.module.sass';

interface FullscreenAvatarProps {
    onClick: Function
    src: string
}

const FullscreenAvatar: React.FC<FullscreenAvatarProps> = ({ onClick, src }) => {
    return (
        <div
            className={styles.FullscreenAvatar}
            onClick={onClick as React.MouseEventHandler<HTMLDivElement>}
        >
            <img src={src} alt="avatar" />
        </div>
    );
}
export default FullscreenAvatar;