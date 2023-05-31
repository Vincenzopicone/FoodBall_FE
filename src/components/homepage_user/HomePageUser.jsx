import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import CardPrenotazione from "./CardPrenotazione";
import "./HomePageUser.css";
import PersonalPage from "./PersonalPage";
import CardEvento from "./CardEvento";
import NewsSection from "../news_section/NewsSection";

const HomePageUser = () => {
  const showReservationState = useSelector(
    (state) => state.show.showReservation
  );
  const showCreateReservationState = useSelector(
    (state) => state.show.showCreateReservation
  );
  const showPersonal = useSelector((state) => state.show.showPersonalPage);
  const showNewsUserState = useSelector((state) => state.show.showNewsUser);

  return (
    <Container fluid className="homePageUser position-relative">
      {/* <div className="goUp text-end">
        {" "}
        <Button href="#" variant="outline-secondary rounded-pill">
          GoUp
        </Button>
      </div> */}
      <Row className="border border-tertiary mb-4 sticky-top ">
        <Sidebar />
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center justify-content-lg-around px-0 ">
        <Col xs={12} sm={11} md={11} lg={9}>
          {showCreateReservationState === true && <CardEvento />}
          {showPersonal === true && <PersonalPage />}
          {showReservationState === true && <CardPrenotazione />}
          {showNewsUserState === true && <NewsSection />}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageUser;
