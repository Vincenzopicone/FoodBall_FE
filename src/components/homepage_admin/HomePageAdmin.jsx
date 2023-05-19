import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import SidebarAdmin from "../sidebar/SidebarAdmin";
import CardPartita from "./CardPartita";
import CardEvent from "./CardEventAdmin";
import "./HomePageAdmin.css";
import { useState } from "react";
import PersonalPageAdmin from "./PersonalPageAdmin";

const HomePageAdmin = () => {
  const [menu, setMenu] = useState(true);
  const myProfile = useSelector((state) => state.app.myProfile);
  const showEventAdminState = useSelector((state) => state.show.showEventAdmin);
  const showCreateEventAdminState = useSelector(
    (state) => state.show.showCreateEventAdmin
  );
  const showPersonalPage = useSelector((state) => state.show.showPersonalPage);
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
            <SidebarAdmin profilo={myProfile} />
          </Col>
        )}

        <Col xs={12} lg={8}>
          {showPersonalPage === true && <PersonalPageAdmin />}
          {showCreateEventAdminState === true && <CardPartita />}
          {showEventAdminState === true && <CardEvent />}
        </Col>
      </Row>
    </Container>
  );
};

export default HomePageAdmin;
