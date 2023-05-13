import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BiFootball } from "react-icons/bi";
import { IoIosFootball } from "react-icons/io";
import "./Navbar.css";

const NavBar = () => {
  return (
    <nav className="navBar py-3 px-3 bg-dark">
      <div className=" d-flex justify-content-start">
        <h1 className="titleNav">
          <span className="text-success">F</span>
          <span>o</span>
          <span>o</span>
          <span className="text-danger">d</span>Ball
        </h1>
      </div>
    </nav>
  );
};

export default NavBar;
