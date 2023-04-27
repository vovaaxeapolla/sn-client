import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import UserStore from './stores/UserStore';
import { createContext } from 'react';

const userStore = new UserStore();

interface IStore {
  userStore: UserStore
}

export const Context = createContext<IStore>({
  userStore,
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Context.Provider value={{ userStore }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
);
