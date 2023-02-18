import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, useContext, lazy } from 'react';
import { observer } from "mobx-react-lite"
import { Context } from '.';
import Auth from './pages/Auth/Auth';

const Forum = lazy(() => import('./pages/Forum/Forum'));

const App = observer(() => {

  const { userStore } = useContext(Context);

  return (
    <div className="App">
      <Suspense fallback="Loading...">
        <Routes>
          <Route path='/' element={userStore.auth ? <Navigate to="/forum/posts" /> : <Navigate to="/auth" />} />
          <Route path='/forum' element={userStore.auth ? <Navigate to="/forum/posts" /> : <Navigate to="/auth" />} />
          <Route path='/forum/*' element={userStore.auth ? <Forum /> : <Navigate to="/auth" />} />
          <Route path='/auth' element={<Auth />} />
        </Routes>
      </Suspense>
    </div>
  );
})

export default App;
