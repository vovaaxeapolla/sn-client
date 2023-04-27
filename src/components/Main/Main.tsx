import './Main.sass';
import Navbar from "../Navbar/Navbar";
import { Route, Routes, useMatch } from 'react-router';
import { useState, useRef } from 'react';
import Profile from '../../pages/profile/Profile';
import Feed from '../../pages/feed/Feed';
import Chat from '../../pages/chat/Chat';
import Settings from '../../pages/accounts/Settings/Settings';
import { Icon } from '../../UI/kit';


const Main = () => {

    const [navbarHidden, setNavbarHidden] = useState(true);
    const [settingsHidden, setSettingsHidden] = useState(true);
    const [chatHidden, setChatHidden] = useState(true);
    const header = useRef<HTMLDivElement>(null);

    const settings = useMatch("/accounts/settings/*");
    const chat = useMatch("/chat/*");

    return (
        <main className="Main">
            <Navbar hidden={navbarHidden} closeCallback={() => setNavbarHidden(prev => !prev)}></Navbar>
            <header className="Main__header">
                <button onClick={() => setNavbarHidden(prev => !prev)}>
                    <Icon>menu</Icon>
                </button>
                <div ref={header}></div>
                {settings &&
                    <button onClick={() => setSettingsHidden(prev => !prev)}>
                        <Icon>gear</Icon>
                    </button>
                }
                {chat && !chatHidden &&
                    <button onClick={() => setChatHidden(prev => !prev)}>
                        <Icon>arrow_back</Icon>
                    </button>
                }
            </header>
            <div className="Main__content">
                <button className="Main__totop Main__totop-hidden">
                </button>
                <Routes>
                    <Route path="/" element={<Feed />} />
                    <Route path="/chat/*" element={
                        <Chat
                            hidden={chatHidden}
                            setHidden={() => setChatHidden(prev => !prev)}
                            headerRef={header}
                        />} />
                    <Route path="/search" element="search"></Route>
                    <Route path="/:nickname" element={<Profile />}></Route>
                    <Route path="/dashboard" element="dashboard"></Route>
                    <Route path="/accounts/settings/*" element={<Settings hidden={settingsHidden} closeCallback={() => setSettingsHidden(prev => !prev)} />}></Route>
                </Routes>
            </div>
        </main>
    )
}

export default Main;