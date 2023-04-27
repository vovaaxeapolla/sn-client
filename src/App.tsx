import './App.css';
import { observer } from "mobx-react-lite"
import Main from './components/Main/Main';
import Auth from './pages/accounts/Auth/Auth';
import { useContext, useEffect } from 'react';
import { Context } from '.';

const App = () => {

  const { userStore } = useContext(Context);
  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      userStore.checkAuth();
      setInterval(() => userStore.checkAuth(), 30 * 60 * 1000);
    } else {
      userStore.setLoading(false);
    }
  }, []);

  return (
    <div className="App">
      {
        userStore.isLoading
          ?
          "Loader"
          :
          userStore.isAuth
            ? < Main />
            : < Auth />
      }
    </div >
  );
}

export default observer(App);
