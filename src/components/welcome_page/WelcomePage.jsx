import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useEffect, useState } from "react";
import moment from "moment";
import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import Burger from "../assets/Burger.png";
import Ristorante from "../assets/restaurant.png";
import Pub from "../assets/Pub.png";
import Pizzeria from "../assets/pizza.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  const [matchList, setMatchList] = useState([]);
  const [localeList, setLocaleList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();

  const clickBack = (n) => {
    if (page === 0) {
      setPage(0);
    } else {
      setPage(n);
    }
    setRefresh(true);
  };

  const clickForward = (n) => {
    if (page < totalPages) {
      setRefresh(true);
      setPage(n);
    } else if (page === totalPages) {
      setPage(totalPages - 1);
    }
  };

  const getPartite = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/partite/pageable?sort=data,ASC&page=${page}&size=10`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMatchList(data.content);
        setTotalPages(data.totalPages);
        setRefresh(false);
      } else {
      }
    } catch {}
  };
  const getLocale = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/locale/random`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (response.ok) {
        setLocaleList(data);
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    getPartite();
  }, [page, refresh]);
  useEffect(() => {
    getLocale();
  }, []);

  return (
    <Container fluid className="welcomePage m-0 pb-3">
      <Row className="d-flex justify-content-between bg-light py-2 sticky-top">
        <Col xs={8} className="d-flex align-items-center">
          <Link to={"/"} className="text-decoration-none text-dark">
            <h3 className="fw-bold fst-italic">FoodBall</h3>
          </Link>
        </Col>
        <Col xs={3} className="d-flex justify-content-end">
          <Button
            variant="secondary rounded-pill"
            className="text-decoration-none fw-bold "
            onClick={() => navigate("/login")}
          >
            {" "}
            ACCEDI{" "}
          </Button>
        </Col>
        {/* <Col xs={2}>
          <Button variant="dark" onClick={() => navigate("/register")}>
            REGISTRATI
          </Button>
        </Col> */}
      </Row>
      <Row className="d-flex justify-content-center align-items-center my-3">
        <Col
          xs={12}
          lg={9}
          xl={7}
          className="bg-light text-center border border-secondary rounded py-2"
        >
          {/* <h1 className="titleFoodball">FoodBall</h1> */}
          <h6>
            Accedi o iscriviti a FoodBall per scoprire i migliori eventi della
            tua città
          </h6>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center ">
        <Col
          xs={12}
          lg={9}
          xl={7}
          className="bg-light border border-secondary rounded py-3 bgMatch"
        >
          <Row className="justify-content-center">
            <Col
              xs={10}
              sm={10}
              className="rounded border border-secondary text-center bg-light py-2"
            >
              {" "}
              <h5 className="py-2">PARTITE IN PROGRAMMA</h5>
              {matchList &&
                matchList.map((p) => (
                  <Row key={p.id} className="justify-content-center mb-1">
                    <Col xs={6} sm={3} md={2} className="text-center">
                      <span>
                        <BsCalendarDate></BsCalendarDate>
                      </span>{" "}
                      {moment(p.data).format("DD-MM")}
                    </Col>
                    <Col xs={6} sm={3} md={3} className="text-center">
                      <span>
                        <BiTime />
                      </span>{" "}
                      {p.orario}
                    </Col>
                    <Col
                      xs={12}
                      sm={6}
                      md={5}
                      className="fw-bold text-center text-sm-start text-uppercase"
                    >
                      {p.squadra1} <span className="fst-italic ">-</span>{" "}
                      {p.squadra2}
                    </Col>
                  </Row>
                ))}
              <Row className="d-flex justify-content-center">
                <Col
                  xs={12}
                  lg={10}
                  xl={7}
                  className="d-flex justify-content-between align-items-center bg-light rounded py-2"
                  s
                >
                  <Button
                    variant="outline-secondary rounded-pill"
                    onClick={() => clickBack(page - 1)}
                  >
                    INDIETRO
                  </Button>
                  <Button
                    variant="outline-secondary rounded-pill"
                    onClick={() => clickForward(page + 1)}
                  >
                    PROSSIMI EVENTI
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="d-flex justify-content-center align-items-center mt-3">
        <Col
          xs={12}
          lg={9}
          xl={7}
          className="bg-light border border-secondary rounded py-3"
        >
          <Row className="d-flex justify-content-center my-3">
            <Col
              xs={12}
              lg={9}
              xl={7}
              className="d-flex justify-content-center align-items-center bg-light rounded py-2"
              s
            >
              <h2>Scelti per te</h2>
            </Col>
          </Row>
          <Row className="d-flex justify-content-around align-items-center">
            {localeList &&
              localeList.map((l) => (
                <Col
                  key={l.id}
                  xs={12}
                  md={5}
                  lg={3}
                  className="rounded p-2 mx-1 my-2 position-relative cardRestaurantWP"
                >
                  <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning text-dark">
                    {l.tipolocale}
                  </span>
                  <Row className="py-3">
                    <Col xs={12} className="text-center">
                      {l.tipolocale === "RISTORANTE" && (
                        <img
                          style={{ height: "90px", width: "100px" }}
                          src={Ristorante}
                          alt="IconaRistorante"
                        />
                      )}
                      {l.tipolocale === "PIZZERIA" && (
                        <img
                          style={{ height: "90px", width: "100px" }}
                          src={Pizzeria}
                          alt="IconaPizzeria"
                        />
                      )}
                      {l.tipolocale === "PUB" && (
                        <img
                          style={{ height: "90px", width: "100px" }}
                          src={Pub}
                          alt="IconaPub"
                        />
                      )}
                      {l.tipolocale === "BURGER" && (
                        <img
                          style={{ height: "90px", width: "100px" }}
                          src={Burger}
                          alt="IconaBurger"
                        />
                      )}
                    </Col>
                    <Col xs={12} className="text-center ">
                      <div>
                        <strong>{l.nomelocale}</strong>
                      </div>
                      <div>{l.indirizzo}</div>
                      <div>
                        <strong>{l.citta}</strong>
                      </div>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
