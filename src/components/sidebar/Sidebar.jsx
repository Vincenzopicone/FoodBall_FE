import { Button, Col } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { FiPower } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
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

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.app.myProfile);
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const showCreateReservationState = useSelector(
    (state) => state.show.showCreateReservation
  );
  const showPersonal = useSelector((state) => state.show.showPersonalPage);

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
        xs={12}
        lg={3}
        className="d-flex text-center justify-content-center align-items-center bg-light"
      >
        <div className="mx-2 fst-italic">
          Ciao, <strong>{myProfile.name}</strong>
        </div>
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
      <Col
        xs={4}
        lg={3}
        className={
          showPersonal === true
            ? "text-center py-2 fieldSelectedSidebar text-uppercase"
            : "text-center py-2 listSidebar"
        }
        onClick={() => clickShowPersonalPage(true)}
      >
        <h6 className=" me-3">
          <span className="iconSectionProfile">
            <CgProfile />{" "}
          </span>
          <span className="d-none d-md-inline">I miei dati personali</span>
        </h6>
      </Col>
      <Col
        xs={4}
        lg={3}
        className={
          showCreateReservationState === true
            ? "text-center py-2 fieldSelectedSidebar text-uppercase"
            : "text-center py-2 listSidebar"
        }
        onClick={() => clickShowCreateReservation(true)}
      >
        <h6 className=" me-3">
          <span className="iconSectionProfile">
            <GiSoccerBall />{" "}
          </span>
          <span className="d-none d-md-inline">Dove vuoi prenotare?</span>
        </h6>
      </Col>
      <Col
        xs={4}
        lg={3}
        className={
          showReservationState === true
            ? "text-center py-2 fieldSelectedSidebar text-uppercase"
            : "text-center py-2 listSidebar"
        }
        onClick={() => clickShowReservation(true)}
      >
        <h6 className=" me-3">
          <span className="iconSectionProfile">
            <BsBook />{" "}
          </span>
          <span className="d-none d-md-inline">Le mie prenotazioni</span>{" "}
        </h6>
      </Col>
    </>
  );
};

export default Sidebar;
