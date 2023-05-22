import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./WelcomePage.css";
import { useEffect, useState } from "react";
import moment from "moment";

const WelcomePage = () => {
  const navigate = useNavigate();

  const [matchList, setMatchList] = useState([]);
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

  useEffect(() => {
    getPartite();
  }, [page, refresh]);

  return (
    <Container fluid className="welcomePage m-0">
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
      {/* <Row className="text-center bg-secondary text-light my-3">
        <Col xs={12}>Le partite in programma</Col>
      </Row> */}
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
            <Col xs={3}> DATA </Col>
            <Col xs={8}> PARTITA </Col>
          </Row>
          {matchList &&
            matchList.map((p) => (
              <Row>
                <Col xs={3}>{moment(p.data).format("DD-MM")}</Col>
                <Col xs={9} className="fw-bold">
                  {p.squadra1} <span className="fst-italic">vs</span>{" "}
                  {p.squadra2}
                </Col>
              </Row>
            ))}
        </Col>
      </Row>
    </Container>
  );
};

export default WelcomePage;
