import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./WelcomePage.css";
import { useDispatch, useSelector } from "react-redux";
import MatchesList from "./MatchesList";
import RestaurantList from "./RestaurantList";
import NewsPageList from "../news_section/NewsSection";
import { SHOW_HOME, SHOW_NEWS } from "../../redux/action";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const showNewsState = useSelector((state) => state.show.showNews);
  const showHomeState = useSelector((state) => state.show.showHome);

  const clickShowHome = () => {
    dispatch({ type: SHOW_HOME, payload: true });
    dispatch({ type: SHOW_NEWS, payload: false });
  };

  const clickShowNews = () => {
    dispatch({ type: SHOW_HOME, payload: false });
    dispatch({ type: SHOW_NEWS, payload: true });
  };

  return (
    <Container
      fluid
      className={
        showNewsState === true
          ? "welcomePageWhitNewsm-0 pb-3 position-relative"
          : "welcomePage m-0 pb-3 position-relative"
      }
    >
      <Row className="d-flex justify-content-center bg-light py-2 sticky-top welcomePageBar">
        <Col
          xs={12}
          className="d-flex justify-content-center align-items-center"
        >
          <Link to={"/"} className="text-decoration-none text-dark me-3">
            <h1 className="fw-bold fst-italic">FoodBall</h1>
          </Link>
          <Link
            onClick={() => clickShowHome()}
            className="text-decoration-none text-dark me-3"
          >
            <h6>HOME</h6>
          </Link>
          <Link
            onClick={() => clickShowNews()}
            className="text-decoration-none text-dark me-3"
          >
            <h6>NEWS</h6>
          </Link>

          <Link
            variant="secondary rounded-pill"
            className="text-decoration-none text-dark fw-bold "
            to={"/login"}
          >
            {" "}
            <h6>LOGIN</h6>{" "}
          </Link>
        </Col>
        <Col xs={3} className="d-flex justify-content-end"></Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center my-3">
        <Col
          xs={12}
          lg={9}
          xl={7}
          className="bg-light text-center border border-secondary rounded py-2"
        >
          {showHomeState === true && (
            <h6>
              Accedi o iscriviti a FoodBall per scoprire i migliori eventi della
              tua città
            </h6>
          )}
          {showNewsState === true && <h4>FoodBall News</h4>}
        </Col>
      </Row>
      <Row className="d-flex flex-column justify-content-center align-items-center justify-content-lg-around px-0 ">
        <Col xs={12} sm={12} md={11} lg={8}>
          {showHomeState === true && (
            <>
              <MatchesList />
              <RestaurantList />
            </>
          )}
          {showNewsState === true && <NewsPageList />}
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
