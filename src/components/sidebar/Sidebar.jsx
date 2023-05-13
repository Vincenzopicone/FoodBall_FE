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
  SHOW_CREATE_RESERVATION,
} from "../../redux/action";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";
import { useState } from "react";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [stateReservation, setStateReservation] = useState(false);
  const [stateCreateReservation, setStateCreateReservation] = useState(false);
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const clickShowReservation = (e) => {
    setStateReservation(e);
    dispatch({ type: SHOW_RESERVATION, payload: stateReservation });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: !stateReservation });
  };
  const clickShowCreateReservation = (e) => {
    setStateCreateReservation(e);
    dispatch({
      type: SHOW_CREATE_RESERVATION,
      payload: stateCreateReservation,
    });
    dispatch({ type: SHOW_RESERVATION, payload: !stateCreateReservation });
  };

  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };
  return (
    <>
      <Row className="d-flex justify-content-center align-items-center py-2 mb-">
        <img
          className="rounded-circle mb-3"
          src={PicFoto}
          style={{ height: "90px", width: "120px" }}
          alt="PlaceHolder profilo"
        />
        <h6>Bentornato,</h6>{" "}
        <h6>
          <strong>{props.profilo.name}</strong>
        </h6>
      </Row>
      <Row className="text-start border-bottom py-2 listSidebar">
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <CgProfile />{" "}
          </span>
          I miei dati personali
        </h6>
      </Row>
      <Row
        className="text-start border-bottom py-2 listSidebar"
        onClick={() => clickShowReservation(!stateReservation)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <BsBook />{" "}
          </span>
          Le mie prenotazioni{" "}
          <Badge bg="secondary">{props.profilo.prenotazione.length}</Badge>
        </h6>
      </Row>
      <Row className="text-start border-bottom py-2 listSidebar">
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <MdRestaurantMenu />{" "}
          </span>
          I miei ristoranti preferiti
        </h6>
      </Row>
      <Row
        className="text-start border-bottom py-2 listSidebar"
        onClick={() => clickShowCreateReservation(!stateCreateReservation)}
      >
        <h6 className="text-secondary me-3">
          <span className="iconSectionProfile">
            <GiSoccerBall />{" "}
          </span>
          Dove vuoi prenotare?
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
