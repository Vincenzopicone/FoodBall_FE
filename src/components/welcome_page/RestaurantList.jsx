import Burger from "../assets/Burger.png";
import Ristorante from "../assets/restaurant.png";
import Pub from "../assets/Pub.png";
import Pizzeria from "../assets/pizza.png";
import { Col, Row, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";

const RestaurantList = () => {
  const [localeList, setLocaleList] = useState([]);
  const [spinner, setSpinner] = useState(true);

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
        setSpinner(false);
      } else {
        setSpinner(false);
      }
    } catch {}
  };

  useEffect(() => {
    getLocale();
  }, []);

  return (
    <Row className="d-flex justify-content-center align-items-center mt-3">
      <Col
        xs={12}
        lg={12}
        xl={11}
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
                {spinner === true && (
                  <Spinner animation="border" variant="secondary" />
                )}
                <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning text-dark">
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
  );
};

export default RestaurantList;
