import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/Navbar.jsx";
import Login from "./components/login_register/Login.jsx";
import Footer from "./components/footer/Footer.jsx";
import HomePageUser from "./components/homepage_user/HomePageUser.jsx";
import HomePageLocale from "./components/homepage_admin/HomePageAdmin.jsx";
import NewsPage from "./components/news_section/NewsSection.jsx";
import Registrati from "./components/login_register/Register.jsx";
import Welcome from "./components/welcome_page/WelcomePage.jsx";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <NavBar /> */}
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registrati />} />
          <Route path="/homepageuser" element={<HomePageUser />} />
          <Route path="/homepageadmin" element={<HomePageLocale />} />
          <Route path="/newspage" element={<NewsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
