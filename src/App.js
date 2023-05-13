import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar.jsx";
import Login from "./components/login_register/Login.jsx";
import Footer from "./components/footer/Footer.jsx";
import HomePageUser from "./components/homepage_user/HomePageUser.jsx";
import HomePageLocale from "./components/homepage_admin/HomePageAdmin.jsx";
import Registrati from "./components/login_register/Register.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/homepageuser" element={<HomePageUser />} />
          <Route path="/homepageadmin" element={<HomePageLocale />} />
          <Route path="/register" element={<Registrati />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
