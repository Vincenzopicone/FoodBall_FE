import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import CardPrenotazione from "./CardPrenotazione";
import "./HomePageUser.css";
import PersonalPage from "./PersonalPage";
import CardEvento from "./CardEvento";

const HomePageUser = () => {
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const showCreateReservationState = useSelector(
    (state) => state.show.showCreateReservation
  );
  const showPersonal = useSelector((state) => state.show.showPersonalPage);

  return (
    <Container fluid className="homePageUser ">
      <Row className="border border-tertiary mb-4 sticky-top ">
        <Sidebar />
      </Row>
      <Row className="d-flex flex-column flex-lg-row justify-content-center justify-content-lg-around px-0 ">
        <Col xs={12} lg={8}>
          {showCreateReservationState === true && <CardEvento />}
          {showPersonal === true && <PersonalPage />}
          {showReservationState === true && <CardPrenotazione />}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageUser;
