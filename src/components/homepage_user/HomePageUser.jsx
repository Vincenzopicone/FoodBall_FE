import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import Sidebar from "../sidebar/Sidebar";
import CardPrenotazione from "./CardPrenotazione";
import CreaPrenotazione from "./CreaPrenotazione";
import "./HomePageUser.css";
import { useState } from "react";
import PersonalPage from "./PersonalPage";

const HomePageUser = () => {
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

  return (
    <Container fluid className="homePageUser ">
      <Row className="d-flex justify-content-center justify-content-lg-start py-2">
        <Col className="d-flex justify-content-center" xs={9} lg={3}>
          <Button variant={"outline-secondary"} onClick={() => clickShowMenu()}>
            {" "}
            <span>
              <TiThMenu />
            </span>{" "}
            Il mio FoodBall{" "}
          </Button>
        </Col>
      </Row>
      <Row className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-around px-0 mb-2">
        {menu === true && (
          <Col xs={12} lg={3} className="sidebar rounded text-center py-3">
            <Sidebar profilo={myProfile} />
          </Col>
        )}

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
