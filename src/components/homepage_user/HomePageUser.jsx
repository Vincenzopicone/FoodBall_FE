import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import CardPrenotazione from "./CardPrenotazione";
import CreaPrenotazione from "./CreaPrenotazione";
import "./HomePageUser.css";

const HomePageUser = () => {
  const myProfile = useSelector((state) => state.app.myProfile);
  const myReservation = useSelector(
    (state) => state.app.myProfile.prenotazione
  );
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const showCreateReservationState = useSelector(
    (state) => state.show.showCreateReservation
  );

  return (
    <Container className="homePageUser px-0 m-0 ps-2">
      <Row className="d-flex justify-content-between px-0">
        <Col xs={3} className="sidebar rounded text-center py-3">
          <Sidebar profilo={myProfile} />
        </Col>
        <Col xs={9}>
          {showCreateReservationState === true && <CreaPrenotazione />}
          {showReservationState === true && (
            <CardPrenotazione prenotazione={myReservation} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageUser;
