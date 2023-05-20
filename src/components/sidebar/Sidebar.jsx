import { Badge, Button, Row, Col } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { FiPower } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
import { MdRestaurantMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_MY_PROFILE,
  SHOW_RESERVATION,
  SHOW_CREATE_RESERVATION,
  REFRESH_RESERVATION,
  SHOW_PERSONALPAGE,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const clickShowPersonalPage = () => {
    dispatch({ type: SHOW_PERSONALPAGE, payload: true });
    dispatch({ type: SHOW_RESERVATION, payload: false });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: false });
    dispatch({ type: REFRESH_RESERVATION, payload: true });
  };
  const clickShowReservation = () => {
    dispatch({ type: SHOW_RESERVATION, payload: true });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: false });
    dispatch({ type: REFRESH_RESERVATION, payload: true });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
  };
  const clickShowCreateReservation = () => {
    dispatch({
      type: SHOW_CREATE_RESERVATION,
      payload: true,
    });
    dispatch({ type: SHOW_RESERVATION, payload: false });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
  };

  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };
  return (
    <>
      <Col
        xs={3}
        className="text-center py-2 listSidebar"
        onClick={() => clickShowPersonalPage(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <CgProfile />{" "}
          </span>
          <span className="d-none d-md-inline">I miei dati personali</span>
        </h6>
      </Col>
      <Col
        xs={3}
        className="text-center py-2 listSidebar"
        onClick={() => clickShowCreateReservation(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <GiSoccerBall />{" "}
          </span>
          <span className="d-none d-md-inline">Dove vuoi prenotare?</span>
        </h6>
      </Col>
      <Col
        xs={3}
        className="text-center py-2 listSidebar"
        onClick={() => clickShowReservation(true)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <BsBook />{" "}
          </span>
          <span className="d-none d-md-inline">Le mie prenotazioni</span>{" "}
        </h6>
      </Col>
      <Col xs={3} className="text-center py-2 listSidebar">
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <MdRestaurantMenu />{" "}
          </span>
          <span className="d-none d-md-inline">
            I miei ristoranti preferiti
          </span>
        </h6>
      </Col>
      {/* <Row className="d-flex justify-content-center pt-3"> */}
      {/* <Col>
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
      </Col> */}
      {/* </Row> */}
    </>
  );
};

export default Sidebar;
