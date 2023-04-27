import { useState, useEffect } from "react";
import { Modal } from "../../UI/kit";
import { Followers } from "../../components/Modals/Modals";
import PostService from "../../services/PostService";
import UsersService from "../../services/UsersService";

interface ProfileStatsProps {
    id: string
}

const ProfileStats: React.FC<ProfileStatsProps> = ({ id }) => {

    const [postsCount, setPostsCount] = useState('0');
    const [followings, setFollowings] = useState('0');
    const [followers, setFollowers] = useState('0');
    const [modalFollowers, setModalFollowers] = useState(false);
    const [modalFollowings, setModalFollowings] = useState(false);

    useEffect(() => {
        (async () => {
            let postsCount = (await PostService.getPostsCount(id)).data.count;
            let followers = (await UsersService.followersCount(id)).data.count;
            let followings = (await UsersService.followingsCount(id)).data.count;
            setPostsCount(postsCount);
            setFollowers(followers);
            setFollowings(followings);
        })();
    }, []);

    return (
        <div className="Profile__middle">
            {
                modalFollowers &&
                <Modal close={() => setModalFollowers(false)}>
                    <Followers type='followers' onClick={() => setModalFollowers(false)} id={id} />
                </Modal>
            }
            {
                modalFollowings &&
                <Modal close={() => setModalFollowers(false)}>
                    <Followers type='followings' onClick={() => setModalFollowings(false)} id={id} />
                </Modal>
            }
            <h4>
                <p>Посты</p>
                {postsCount}
            </h4>
            <button onClick={() => setModalFollowers(true)}>
                <h4>
                    <p>Подписчики</p>
                    {followers}
                </h4>
            </button>
            <button onClick={() => setModalFollowings(true)}>
                <h4>
                    <p>Подписки</p>
                    {followings}
                </h4>
            </button>
        </div>
    );
}

export default ProfileStats;