import './Forum.css';
import Header from '../../components/Header/Header';
import LeftBar from '../../components/LeftBar/LeftBar';
import { Context } from '../../index';
import { Route, Routes, Navigate } from 'react-router';
import { useContext, useState, Suspense, lazy } from 'react';
import Button from '../../UI/Button';
import Loader from '../../UI/Loader';
import { Link } from 'react-router-dom';
import Img from '../../components/Img/Img';

const Profile = lazy(() => import('../../components/Profile/Profile'));
const PostList = lazy(() => import('../../components/PostList'));
const PostCreate = lazy(() => import('../../components/PostCreate'));

const Forum = () => {

    const { userStore } = useContext(Context);

    return (
        <div className="forum">
            <Header>
                <div className="header__wrapper">
                    <h1>Forum</h1>
                    <div className="header__user">
                        <div className="avatar-icon">
                            <Img url={`/avatar/${userStore.user.avatar}`} alt="profile__avatar" />
                        </div>
                        <div className="header__name">
                            <Link to={"/forum/profile/" + userStore.user.nickname}>{userStore.user.name + " " + userStore.user.surname}</Link>
                        </div>
                    </div>
                    <Button onClick={async () => await userStore.logout()}>
                        Выйти
                    </Button>
                </div>
            </Header>
            <LeftBar>
                <Link className='menu__item' to={'/forum/profile/' + userStore.user.nickname}>Профиль</Link>
                <Link className='menu__item' to={'/forum/createpost'}>Создать пост</Link>
                <Link className='menu__item' to={'/forum/posts'}>Последнии посты</Link>
            </LeftBar>
            <main className='forum__main'>
                <div className="forum__center">
                    <Suspense fallback={<Loader />}>
                        <Routes>
                            <Route path='/profile/:nickname' element={userStore.auth ? <Profile /> : <Navigate to="/auth" />} />
                            <Route path='/createpost' element={userStore.auth ? <PostCreate /> : <Navigate to="/auth" />} />
                            <Route path='/posts' element={userStore.auth ? <PostList /> : <Navigate to="/auth" />} />
                        </Routes>
                    </Suspense>
                </div>
            </main >
        </div >
    )
}

export default Forum;