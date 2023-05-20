import PicFoto from "../assets/ProfilePic.png";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import { FiPower } from "react-icons/fi";
import Sidebar from "../sidebar/Sidebar";
import CardPrenotazione from "./CardPrenotazione";
import CreaPrenotazione from "./CreaPrenotazione";
import "./HomePageUser.css";
import { useState } from "react";
import PersonalPage from "./PersonalPage";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_MY_PROFILE } from "../../redux/action";

const HomePageUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menu, setMenu] = useState(true);
  const myProfile = useSelector((state) => state.app.myProfile);
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const showCreateReservationState = useSelector(
    (state) => state.show.showCreateReservation
  );
  const showPersonal = useSelector((state) => state.show.showPersonalPage);
  const clickShowMenu = () => {
    setMenu(!menu);
  };
  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };

  return (
    <Container fluid className="homePageUser ">
      <Row className="d-flex justify-content-center align-items-baseline pt-3 bg-light">
        <Col
          xs={12}
          className="d-flex justify-content-end align-items-baseline "
        >
          {/* <img
            className="rounded-circle me-3"
            src={PicFoto}
            style={{ height: "20px", width: "23px" }}
            alt="PlaceHolder profilo"
          /> */}
          <p>Ciao,</p>{" "}
          <p className="mx-2">
            <strong>{myProfile.name}</strong>
          </p>
          <Button
            onClick={() => logoutClick()}
            variant={"outline-secondary"}
            className="d-flex justify-content-center align-item-end rounded-pill"
          >
            <span className="me-2">
              <FiPower />
            </span>
            <span>Esci</span>
          </Button>
        </Col>
        {/* <Col className="d-flex justify-content-center" xs={2}>
          <Button variant={"outline-secondary"} onClick={() => clickShowMenu()}>
            {" "}
            <span>
              <TiThMenu />
            </span>{" "}
            Il mio FoodBall{" "}
          </Button>
        </Col> */}
      </Row>
      <Row className="border border-tertiary mb-4 sticky-top ">
        <Sidebar />
      </Row>
      <Row className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-around px-0 ">
        <Col xs={12} lg={8}>
          {showCreateReservationState === true && <CreaPrenotazione />}
          {showPersonal === true && <PersonalPage />}
          {showReservationState === true && <CardPrenotazione />}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageUser;
