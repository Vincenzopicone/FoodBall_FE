import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";

const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <Container fluid className="welcomePage m-0">
      <Row className="d-flex justify-content-start bg-light py-2 sticky-top">
        <Col xs={2} className="d-flex justify-content-end">
          <Button variant="dark" onClick={() => navigate("/login")}>
            {" "}
            ACCEDI{" "}
          </Button>
        </Col>
        <Col xs={2}>
          <Button variant="dark" onClick={() => navigate("/register")}>
            REGISTRATI
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
