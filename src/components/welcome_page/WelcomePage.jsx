import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useEffect, useState } from "react";
import moment from "moment";
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
  const clickBack = (n) => {
    if (page === 0) {
      setPage(0);
    } else {
      setPage(n);
    }
    setRefresh(true);
  };

  const clickForward = (n) => {
    setRefresh(true);
    setPage(n);
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
        console.log(data);
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
      <Row className="d-flex justify-content-center bg-light py-2 sticky-top">
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
      <Row className="d-flex justify-content-center align-items-center my-3">
        <Col
          xs={12}
          lg={9}
          xl={6}
          className="bg-light text-center border border-secondary rounded py-2"
        >
          <h1 className="titleFoodball">FoodBall</h1>
          <h6>
            Accedi o iscriviti a FoodBall per scoprire i migliori eventi della
            tua città
          </h6>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center my-3">
        <Col
          xs={12}
          lg={9}
          xl={6}
          className="d-flex justify-content-between align-items-center bg-light border border-secondary rounded py-2"
          s
        >
          <Button variant="secondary" onClick={() => clickBack(page - 1)}>
            INDIETRO
          </Button>
          <Button variant="secondary" onClick={() => clickForward(page + 1)}>
            PROSSIMI EVENTI
          </Button>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        <Col
          xs={12}
          lg={9}
          xl={6}
          className="bg-light border border-secondary rounded py-3"
        >
          <Row>
            <Col xs={2}> DATA </Col>
            <Col xs={2}> ORARIO</Col>
            <Col xs={8}> PARTITA </Col>
          </Row>
          {matchList &&
            matchList.map((p) => (
              <Row key={p.id}>
                <Col xs={2}>{moment(p.data).format("DD-MM")}</Col>
                <Col xs={2}>{p.orario}</Col>
                <Col xs={8} className="fw-bold">
                  {p.squadra1} <span className="fst-italic">vs</span>{" "}
                  {p.squadra2}
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
      <Row className="d-flex justify-content-center my-3">
        <Col
          xs={12}
          lg={9}
          xl={6}
          className="d-flex justify-content-center align-items-center bg-light border border-secondary rounded py-2"
          s
        >
          <h2>Cerca fra tantissimi locali</h2>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center align-items-center mt-3">
        <Col
          xs={12}
          lg={9}
          xl={6}
          className="bg-light border border-secondary rounded py-3"
        >
          <Row className="d-flex justify-content-around align-items-center">
            {localeList &&
              localeList.map((l) => (
                <Col
                  xs={12}
                  md={5}
                  lg={3}
                  className="border border-secondary rounded p-2 m-1"
                >
                  <Row>
                    <Col xs={12} className="text-center">
                      {l.tipolocale === "RISTORANTE" && (
                        <img
                          style={{ height: "80px", width: "100px" }}
                          src={Ristorante}
                          alt="IconaRistorante"
                        />
                      )}
                      {l.tipolocale === "PIZZERIA" && (
                        <img
                          style={{ height: "80px", width: "100px" }}
                          src={Pizzeria}
                          alt="IconaPizzeria"
                        />
                      )}
                      {l.tipolocale === "PUB" && (
                        <img
                          style={{ height: "80px", width: "100px" }}
                          src={Pub}
                          alt="IconaPub"
                        />
                      )}
                      {l.tipolocale === "BURGER" && (
                        <img
                          style={{ height: "80px", width: "100px" }}
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
