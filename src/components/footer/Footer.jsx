import { Row } from "react-bootstrap";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";
import { Link } from "react-router-dom";
import {GoLocation} from 'react-icons/go';
import "./Footer.css";

const Footer = () => {
    const date = new Date();
    const currentYear = date.getFullYear();
  return (
    <footer className="p-4 bodyFooter">
    <section className="d-flex justify-content-center mb-1">
      <div className="titleFooter mb-1"><strong>FoodBall</strong></div>
    </section>
    <section className="d-flex justify-content-center align-items-center mb-1">
        <BiCopyright />
      <div className="ms-1">Vincenzo Picone</div>{" "}
      <div className="fw-bold ms-2">{currentYear}</div>{" "}
    </section>
    <section className="d-flex justify-content-center align-items-center">
      <BsGithub />
      <Link
        className="text-light text-decoration-none mx-1"
        to={"https://github.com/Vincenzopicone"}
      >
        {" "}
        GitHub{" - "}
      </Link>
      <BsLinkedin />
      <Link
        className="text-light text-decoration-none mx-1"
        to={"https://www.linkedin.com/in/vincenzo-picone-1032811a4/"}
      >
        LinkedIn{" "}
      </Link>
    </section>
  </footer>
  );
};

export default Footer;
