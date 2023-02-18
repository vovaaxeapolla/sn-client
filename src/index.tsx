import { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import User from './store/user';

const userStore = new User();
userStore.checkAuth();

export const Context = createContext({ userStore });

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
