import { Button, Col } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import { FiPower } from "react-icons/fi";
import { GiSoccerBall } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import {
  LOGOUT_MY_PROFILE,
  SHOW_RESERVATION,
  SHOW_CREATE_RESERVATION,
  REFRESH_RESERVATION,
  SHOW_PERSONALPAGE,
  SHOW_NEWS_USER,
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
  const showNewsUserState = useSelector((state) => state.show.showNewsUser);

  const clickShowPersonalPage = () => {
    dispatch({ type: SHOW_PERSONALPAGE, payload: true });
    dispatch({ type: SHOW_RESERVATION, payload: false });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: false });
    dispatch({ type: REFRESH_RESERVATION, payload: true });
    dispatch({ type: SHOW_NEWS_USER, payload: false });
  };
  const clickShowReservation = () => {
    dispatch({ type: SHOW_RESERVATION, payload: true });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: false });
    dispatch({ type: REFRESH_RESERVATION, payload: true });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
    dispatch({ type: SHOW_NEWS_USER, payload: false });
  };
  const clickShowCreateReservation = () => {
    dispatch({
      type: SHOW_CREATE_RESERVATION,
      payload: true,
    });
    dispatch({ type: SHOW_RESERVATION, payload: false });
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
    dispatch({ type: SHOW_NEWS_USER, payload: false });
  };
  const clickShowNewsUser = () => {
    dispatch({ type: SHOW_PERSONALPAGE, payload: false });
    dispatch({ type: SHOW_RESERVATION, payload: false });
    dispatch({ type: SHOW_CREATE_RESERVATION, payload: false });
    dispatch({ type: REFRESH_RESERVATION, payload: true });
    dispatch({ type: SHOW_NEWS_USER, payload: true });
  };

  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };
  return (
    <>
      <Col xs={12} className="d-flex justify-content-center listSidebar ">
        <h1 className="titleFoodball">FoodBall</h1>
      </Col>
      <Col
        onClick={() => clickShowPersonalPage(true)}
        xs={12}
        lg={3}
        className={
          showPersonal === true
            ? "d-flex justify-content-center align-items-center py-2 fieldSelectedSidebar"
            : "d-flex justify-content-center align-items-center py-2 listSidebar"
        }
      >
        <div className="mx-2 fst-italic">
          Ciao, <strong>{myProfile.name}</strong>
        </div>
        <div
          onClick={() => logoutClick()}
          variant={"outline-secondary"}
          className="d-flex justify-content-center align-item-end text-danger rounded-pill"
        >
          {/* <span className="me-2">
            <FiPower />
          </span> */}
          <span>Logout</span>
        </div>
      </Col>
      <Col
        xs={4}
        lg={3}
        className={
          showCreateReservationState === true
            ? "text-center py-2 fieldSelectedSidebar"
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
            ? "text-center py-2 fieldSelectedSidebar"
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
      <Col
        xs={4}
        lg={3}
        className={
          showNewsUserState === true
            ? "text-center py-2 fieldSelectedSidebar"
            : "text-center py-2 listSidebar"
        }
        onClick={() => clickShowNewsUser(true)}
      >
        <h6 className=" me-3">
          <span className="iconSectionProfile">
            <BiNews />{" "}
          </span>
          <span className="d-none d-md-inline">News</span>
        </h6>
      </Col>
    </>
  );
};

export default Sidebar;
