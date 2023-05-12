import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { BsBook } from "react-icons/bs";
import { FiPower } from "react-icons/fi";
import PicFoto from "../assets/ProfilePic.png";
import { LOGOUT_MY_PROFILE } from "../../redux/action";
import { useNavigate } from "react-router-dom";

const HomePageUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myProfile = useSelector((state) => state.app.myProfile);
  const token = useSelector((state) => state.app.myProfile.accessToken);
  console.log(myProfile);

  const logoutClick = () => {
    dispatch({ type: LOGOUT_MY_PROFILE, playload: {} });
    navigate("/");
  };

  return (
    <Container className="py-5">
      <Row className="d-flex justify-content-center">
        <Col xs={3}>
          <Row className="d-flex justify-content-center align-items-center py-2 mb-3">
            <img
              className="rounded-circle"
              src={PicFoto}
              style={{ height: "130px", width: "160px" }}
              alt="PlaceHolder profilo"
            />
            <h6>Bentornato,</h6>{" "}
            <h6>
              <strong>{myProfile.name}</strong>
            </h6>
          </Row>
          <Row className="border-bottom mb-3 py-2">
            <h6 className="text-secondary me-3">
              <span>
                <CgProfile />{" "}
              </span>
              I miei dati personali
            </h6>
          </Row>
          <Row className="border-bottom mb-3 py-2">
            <h6 className="text-secondary me-3">
              <span>
                <BsBook />{" "}
              </span>
              Le mie prenotazioni{" "}
              <Badge bg="secondary">{myProfile.prenotazione.length}</Badge>
            </h6>
          </Row>
          <Row className="border-bottom mb-3 py-2">
            <h6 className="text-secondary me-3">
              <span>
                <CgProfile />{" "}
              </span>
              I miei ristoranti preferiti
            </h6>
          </Row>
          <Row className="border-bottom mb-3 py-2">
            <h6 className="text-secondary me-3">
              <span>
                <CgProfile />{" "}
              </span>
              Le mie squadre preferite
            </h6>
          </Row>
          <Row className="d-flex justify-content-center">
            <Col xs={6}>
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
          </Row>
        </Col>
        <Col xs={9}>Ricerca </Col>
      </Row>
    </Container>
  );
};

export default HomePageUser;
