import "./NewsSection.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import { GiFountainPen } from "react-icons/gi";

const NewsPage = () => {
  const [news, setNews] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;
  const [spinner, setSpinner] = useState(true);
  const [fonte, setFonte] = useState("gazzetta.it");

  const getNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?domains=${fonte}`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNews(data.articles.slice(1, 15));
        setSpinner(false);
      } else {
        setSpinner(false);
      }
    } catch {}
  };

  useEffect(() => {
    getNews();
  }, [fonte]);

  return (
    <Container fluid>
      <Row className="d-flex justify-content-center align-items-center">
        {spinner === true && (
          <>
            <Col
              xs={9}
              md={7}
              lg={5}
              xxl={4}
              className="d-flex justify-content-center rounded py-5"
            >
              <div>
                <Spinner animation="border" variant="secondary" />
              </div>
            </Col>
          </>
        )}
        {/* <Col xs={12} className="d-flex justify-content-center">
          <h3>FoodBall News</h3>
        </Col> */}
        <Col xs={12} className="mb-2">
          <div className="d-flex justify-content-around flex-wrap rounded p-1">
            <Button
              variant={
                fonte === "tuttomercatoweb.com"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("tuttomercatoweb.com")}
            >
              TMW
            </Button>
            <Button
              variant={
                fonte === "gazzetta.it"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("gazzetta.it")}
            >
              Gazzetta
            </Button>
            <Button
              variant={
                fonte === "calciomercato.com"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("calciomercato.com")}
            >
              CM.com
            </Button>
            <Button
              variant={
                fonte === "repubblica.it"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("repubblica.it")}
            >
              Repubblica
            </Button>
            <Button
              variant={
                fonte === "corriere.it"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("corriere.it")}
            >
              Corriere
            </Button>
            <Button
              variant={
                fonte === "ansa.it"
                  ? "secondary rounded-pill"
                  : "outline-secondary rounded-pill"
              }
              onClick={() => setFonte("ansa.it")}
            >
              ANSA
            </Button>
          </div>
        </Col>

        <Col xs={12} sm={9} md={8} lg={12} className="bg-light rounded">
          <Row className="justify-content-around ">
            {news &&
              news?.map((n, i) => (
                <Col
                  key={i}
                  xs={12}
                  className="mb-2 border border-tertiary rounded p-0 bg-light "
                >
                  <Row>
                    <Col xs={12} md={12} lg={4}>
                      <Card.Img
                        style={{ maxHeight: "300px" }}
                        className="fluid rounded"
                        src={n.urlToImage}
                        alt="Foto Articolo"
                      />
                    </Col>
                    <Col xs={12} md={12} lg={8}>
                      <Row className="d-flex flex-column justify-content-between p-3">
                        <Col>
                          <h5 className="fw-bold text-uppercase">{n.title}</h5>
                        </Col>
                        <Col>
                          <h6 className="text-secondary">{n.description}</h6>
                        </Col>
                        <Col className="d-flex justify-content-between px-2">
                          <div className="me-2 text-secondary fst-italic d-none d-lg-block">
                            <span>
                              <GiFountainPen />
                            </span>
                            {n.author}
                          </div>
                          <div className="text-secondary fst-italic d-none d-lg-block">
                            {n.source.name}
                          </div>
                          <div>
                            <Link
                              className="text-decoration-none fw-bold rounded-pill text-dark"
                              to={n.url}
                              target="_blank"
                            >
                              Articolo completo{" "}
                              <span>
                                <ImArrowRight2 />
                              </span>
                            </Link>
                          </div>
                        </Col>
                      </Row>
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
export default NewsPage;
