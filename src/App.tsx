import Console from "./components/Console/Console";
import "./App.css";
import { observer } from "mobx-react-lite";
import { Routes, Route } from 'react-router-dom'

const App = observer(() => {
  return (
    <div className="app">
      <Console />
    </div>
  );
});

export default App;