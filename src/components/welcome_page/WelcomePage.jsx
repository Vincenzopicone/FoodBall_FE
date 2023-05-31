import { Button, Col, Container, Dropdown, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useDispatch, useSelector } from "react-redux";
import MatchesList from "./MatchesList";
import RestaurantList from "./RestaurantList";
import NewsPageList from "../news_section/NewsSection";
import RegisterPage from "../login_register/Register";
import {
  SHOW_HOME,
  SHOW_NEWS,
  SAVE_MY_PROFILE,
  REFRESH_RESERVATION,
  SHOW_REGISTER,
} from "../../redux/action";
import { useEffect, useState } from "react";

const WelcomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erroreLogin, setErroreLogin] = useState(false);
  const [responseLogin, setResponseLogin] = useState();
  const [invioLogin, setInvioLogin] = useState(false);

  const fieldClickError = () => {
    setErroreLogin(false);
  };

  const handleClick = (e) => {
    setInvioLogin(!invioLogin);
  };
  const postLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseLogin(data.roles[0].roleName);
        dispatch({ type: SAVE_MY_PROFILE, payload: data });
        dispatch({ type: REFRESH_RESERVATION, payload: false });
        setInvioLogin(false);
        setErroreLogin(false);
      } else {
        setErroreLogin(true);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (invioLogin === true) {
      postLogin();
    }

    if (responseLogin === "ROLE_USER") {
      navigate("/homepageuser");
    } else if (responseLogin === "ROLE_ADMIN") {
      navigate("/homepageadmin");
    }
    setErroreLogin(false);
  }, [invioLogin]);
  const showNewsState = useSelector((state) => state.show.showNews);
  const showHomeState = useSelector((state) => state.show.showHome);
  const showRegisterState = useSelector((state) => state.show.showRegister);

  const clickShowHome = () => {
    dispatch({ type: SHOW_HOME, payload: true });
    dispatch({ type: SHOW_NEWS, payload: false });
    dispatch({ type: SHOW_REGISTER, payload: false });
  };

  const clickShowNews = () => {
    dispatch({ type: SHOW_HOME, payload: false });
    dispatch({ type: SHOW_NEWS, payload: true });
    dispatch({ type: SHOW_REGISTER, payload: false });
  };

  const clickShowRegister = () => {
    dispatch({ type: SHOW_HOME, payload: false });
    dispatch({ type: SHOW_NEWS, payload: false });
    dispatch({ type: SHOW_REGISTER, payload: true });
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
          <Link to={"/"} className="text-decoration-none text-dark me-3">
            <h1 className="fw-bold fst-italic">FoodBall</h1>
          </Link>

          {/* <Link
            variant="secondary rounded-pill"
            className="text-decoration-none text-dark fw-bold "
            to={"/login"}
          >
            {" "}
            <h6>LOGIN</h6>{" "}
          </Link> */}
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary rounded-pill"
              id="dropdown-basic"
            >
              Login
            </Dropdown.Toggle>

            <Dropdown.Menu className="p-3 bg-light">
              <div className="mb-2">
                <input
                  className="rounded-pill text-center p-1"
                  type="text"
                  placeholder="Username"
                  onClick={() => fieldClickError()}
                  onChange={(e) => setUsername(e.target.value)}
                ></input>
              </div>
              <div className="mb-2">
                <input
                  className="rounded-pill text-center p-1"
                  type="password"
                  placeholder="Password"
                  onClick={() => fieldClickError()}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
              </div>
              <div className="text-center">
                <Button
                  variant="secondary rounded-pill"
                  onClick={() => handleClick()}
                >
                  Accedi
                </Button>
                {erroreLogin === true && (
                  <p className="text-danger"> Username o password errata!</p>
                )}
              </div>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col xs={3} className="d-flex justify-content-end"></Col>
      </Row>
      {showHomeState === true && (
        <Row className="d-flex justify-content-center align-items-center">
          <Col
            xs={12}
            md={11}
            lg={8}
            xl={7}
            className="bg-light text-center border border-secondary rounded py-2 my-2"
          >
            <h6>
              Accedi o{" "}
              <span>
                <Link
                  className="text-decoration-none"
                  onClick={() => clickShowRegister()}
                >
                  {" "}
                  iscriviti
                </Link>
              </span>{" "}
              a FoodBall per scoprire i migliori eventi della tua città
            </h6>
          </Col>
        </Row>
      )}
      <Row className="d-flex flex-column justify-content-center align-items-center justify-content-lg-around px-0 ">
        <Col xs={12} sm={12} md={11} lg={8}>
          {showHomeState === true && (
            <>
              <MatchesList />
              <RestaurantList />
            </>
          )}
          {showNewsState === true && <NewsPageList />}

          {showRegisterState === true && <RegisterPage />}
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
