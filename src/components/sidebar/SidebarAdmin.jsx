import { Badge, Button, Row, Col } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { FiPower } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import PicFoto from "../assets/ProfilePic.png";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_MY_PROFILE,
  SHOW_RESERVATION,
  SHOW_PERSONALPAGE,
  SHOW_CREATE_EVENT,
  SHOW_EVENT_ADMIN,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";
import Burger from "../assets/Burger.png";
import Ristorante from "../assets/restaurant.png";
import Pub from "../assets/Pub.png";
import Pizzeria from "../assets/pizza.png";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickShowPersonalPage = () => {
    dispatch({ type: SHOW_PERSONALPAGE, payload: true });
    dispatch({
      type: SHOW_CREATE_EVENT,
      payload: false,
    });
    dispatch({ type: SHOW_EVENT_ADMIN, payload: false });
  };
  const clickShowEvent = () => {
    dispatch({ type: SHOW_EVENT_ADMIN, payload: true });
    dispatch({ type: SHOW_CREATE_EVENT, payload: false });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
  };
  const clickShowCreateEvent = () => {
    dispatch({
      type: SHOW_CREATE_EVENT,
      payload: true,
    });
    dispatch({ type: SHOW_EVENT_ADMIN, payload: false });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
  };

  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };
  return (
    <>
      <Row className="d-flex justify-content-center align-items-center py-2 mb-">
        {/* <img
          className="rounded-circle mb-3"
          src={PicFoto}
          style={{ height: "90px", width: "120px" }}
          alt="PlaceHolder profilo"
        /> */}
        {props.profilo.locale.tipolocale === "RISTORANTE" && (
          <img
            style={{ height: "90px", width: "120px" }}
            src={Ristorante}
            alt="IconaRistorante"
          />
        )}
        {props.profilo.locale.tipolocale === "PIZZERIA" && (
          <img
            style={{ height: "90px", width: "120px" }}
            src={Pizzeria}
            alt="IconaPizzeria"
          />
        )}
        {props.profilo.locale.tipolocale === "PUB" && (
          <img
            style={{ height: "90px", width: "120px" }}
            src={Pub}
            alt="IconaPub"
          />
        )}
        {props.profilo.locale.tipolocale === "BURGER" && (
          <img
            style={{ height: "90px", width: "120px" }}
            src={Burger}
            alt="IconaBurger"
          />
        )}
        <h6>Bentornato,</h6>{" "}
        <h6>
          <strong>{props.profilo.name}</strong>
        </h6>
      </Row>
      <Row
        className="text-start border-bottom py-2 listSidebar"
        onClick={() => clickShowPersonalPage(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <CgProfile />{" "}
          </span>
          I dati del tuo locale
        </h6>
      </Row>
      <Row
        className="text-start border-bottom py-2 listSidebar"
        onClick={() => clickShowEvent(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <BsBook />{" "}
          </span>
          I nostri eventi{" "}
        </h6>
      </Row>
      <Row
        className="text-start border-bottom py-2 listSidebar"
        onClick={() => clickShowCreateEvent(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <GiSoccerBall />{" "}
          </span>
          Crea il tuo evento
        </h6>
      </Row>
      <Row className="d-flex justify-content-center pt-3">
        <Col>
          <Button
            onClick={() => logoutClick()}
            variant={"outline-secondary"}
            className="d-flex justify-content-center align-item-end rounded"
          >
            <span className="me-2">
              <FiPower />
            </span>
            <span>Esci</span>
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Sidebar;
