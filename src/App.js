import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/login/Login.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Login/>
      <Routes>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
