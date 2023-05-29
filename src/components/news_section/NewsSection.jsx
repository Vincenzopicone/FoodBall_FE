import "./NewsSection.css";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ImArrowRight2 } from "react-icons/im";
import { GiFountainPen } from "react-icons/gi";

const NewsPage = () => {
  const [news, setNews] = useState();
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;
  const [spinner, setSpinner] = useState(true);

  const getNews = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?domains=gazzetta.it`,
        {
          headers: {
            Authorization: apiKey,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setNews(data.articles);
        setSpinner(false);
      } else {
        setSpinner(false);
      }
    } catch {}
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <Row className="d-flex justify-content-center align-items-center mt-3">
      {spinner === true && (
        <>
          <Col
            xs={9}
            md={7}
            lg={5}
            xxl={4}
            className="d-flex justify-content-center border border-secondary rounded bg-light py-5"
          >
            <div>
              <Spinner animation="border" variant="secondary" />
            </div>
          </Col>
        </>
      )}

      <Col xs={12} lg={11} className="bg-light border border-secondary rounded">
        <Row className="justify-content-around ">
          {news &&
            news?.map((n, i) => (
              <Col
                key={i}
                xs={12}
                sm={12}
                md={12}
                className="mb-2 border border-tertiary rounded p-0 bg-light "
              >
                <Row>
                  <Col xs={12} md={4}>
                    <Card.Img
                      style={{ maxHeight: "300px" }}
                      className="fluid rounded"
                      src={n.urlToImage}
                      alt="Foto Articolo"
                    />
                  </Col>
                  <Col
                    xs={12}
                    md={8}
                    className="d-flex flex-column justify-content-between py-2"
                  >
                    <div>
                      <h5 className="fw-bold text-uppercase">{n.title}</h5>
                    </div>
                    <div>
                      <h6 className="text-secondary">{n.description}</h6>
                    </div>
                    <div className="d-flex justify-content-between px-2">
                      <div className="me-2 text-secondary fst-italic">
                        <span>
                          <GiFountainPen />
                        </span>
                        {n.author}
                      </div>
                      <div className="text-secondary fst-italic">
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
                    </div>
                  </Col>
                </Row>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};
export default NewsPage;
