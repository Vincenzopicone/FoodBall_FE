
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar/Navbar.jsx';
import Login from './components/login_register/Login.jsx';
import Footer from './components/footer/Footer.jsx';
import HomePageUser from './components/homePageUser/HomePageUser.jsx';
import HomePageLocale from './components/homePageLocale/HomePageLocale.jsx';
import Registrati from './components/login_register/Register.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <NavBar/>

      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/homepageuser' element={<HomePageUser/>}/>
        <Route path='/homepageadmin' element={<HomePageLocale/>}/>
        <Route path='/register' element={<Registrati/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
