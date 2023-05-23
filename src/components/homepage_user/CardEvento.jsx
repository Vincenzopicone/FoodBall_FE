import { Alert, Badge, Button, Col, Container, Row } from "react-bootstrap";
import { VscLocation } from "react-icons/vsc";
import { BsCalendar3 } from "react-icons/bs";
import { BsSearch } from "react-icons/bs";
import moment from "moment";
import "moment/locale/it";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Burger from "../assets/Burger.png";
import Ristorante from "../assets/restaurant.png";
import Pub from "../assets/Pub.png";
import Pizzeria from "../assets/pizza.png";

const CardEvento = (props) => {
  const dispatch = useDispatch();
  const dateToStart = moment().format("YYYY-MM-DD");
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const [eventState, setEventState] = useState();
  const [utente, setUtente] = useState(myProfile.username);
  const [event, setEvent] = useState([]);
  const showCardEventState = useSelector((state) => state.show.showCardEvent);
  const [postiSelezionati, setPostiSelezionati] = useState(1);
  const [invioReservation, setInvioReservation] = useState(false);
  const [invioOK, setInvioOK] = useState(false);
  const [invioNOT_OK, setInvioNOT_OK] = useState(false);
  const [msg, setMsg] = useState("");
  const [locale, setLocale] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [empty, setEmpty] = useState("");
  const [alertEmpty, setAlertEmpty] = useState(false);
  moment.locale("it");
  const [pageable, setPageable] = useState(0);
  const postiPrenotati = [];

  const clickShowEvent = () => {
    setEventState(true);
  };
  for (let i = 1; i < 16; i++) {
    postiPrenotati.push(i);
  }
  const [reservation, setReservation] = useState();

  const saveReservation = (e, nome, data) => {
    setReservation(e);
    setLocale(nome);
    setDataEvento(data);
    setInvioReservation(true);
    setEventState(true);
  };
  const [eventCity, setEventCity] = useState("");
  const handleChangeEvent = (e) => {
    setEventCity(e);
    setAlertEmpty(false);
  };
  const handleSelectChange = (e) => {
    setPostiSelezionati(e);
    setInvioNOT_OK(false);
    setInvioOK(false);
  };
  const forwardButton = () => {
    setPageable(pageable + 1);
  };
  const backButton = () => {
    setPageable(pageable - 1);
  };
  const postAddRservation = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/prenotazione/crea",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idevento: reservation,
            usernameutente: utente,
            numeropersone: postiSelezionati,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setInvioReservation(false);
        setInvioOK(true);
        setInvioNOT_OK(false);
        setEventState(false);
        setPostiSelezionati(1);
      } else {
        setInvioReservation(false);
        setInvioNOT_OK(true);
        setInvioOK(false);

        setMsg(data.message);
      }
    } catch (error) {}
  };

  const getEventByCity = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/pageable/order/${eventCity}/data/${dateToStart}/page/${pageable}/size/10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvent(data.content);
        setEventState(false);
        setAlertEmpty(false);
        if (data.empty === true) {
          setEmpty("Siamo spiacenti, ma non ci sono eventi a");
          setAlertEmpty(true);
        }
      } else {
        setEventState(false);
      }
    } catch {}
  };

  useEffect(() => {
    if (showCardEventState === true) {
      getEventByCity();
    }
  }, [eventState, invioOK, pageable]);

  useEffect(() => {
    if (invioReservation === true) {
      postAddRservation();
    }
  }, [invioReservation]);
  return (
    <Container fluid>
      <Row className="border border-secondary rounded justify-content-center searchSection">
        <Col
          md={7}
          lg={4}
          className="text-center d-flex flex-column justify-content-center p-3"
        >
          <div className="d-flex flex-column bg-light p-3 rounded">
            <h5 className="fw-bold">Prenota un tavolo</h5>
            <input
              className="rounded p-1 mb-1"
              type="text"
              placeholder="Ricerca per città"
              onChange={(e) => handleChangeEvent(e.target.value)}
            ></input>

            <Button variant={"secondary"} onClick={() => clickShowEvent()}>
              {" "}
              <span>
                <BsSearch />
              </span>{" "}
              Cerca
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="py-2 border border-secondary justify-content-center align-items-baseline bg-light rounded py-2 mt-2">
        <Col xs={4} md={4}>
          <h6>
            Ecco gli eventi a: <strong>{event[0]?.citta}</strong>
          </h6>
        </Col>
        <Col xs={4} md={2}>
          <Button variant="outline-secondary" onClick={() => backButton()}>
            INDIETRO
          </Button>
        </Col>
        <Col xs={4} md={2}>
          <Button variant="outline-secondary" onClick={() => forwardButton()}>
            AVANTI
          </Button>
        </Col>
      </Row>

      <Row className="d-flex border border-secondary justify-content-around rounded py-3 my-2 bgSearch">
        <Row className="justify-content-center my-2">
          <Col xs={12} md={9} lg={9}>
            {invioOK === true && (
              <Alert className="text-center rounded-pill" variant={"success"}>
                Prenotazione al <span className="fw-bold">{locale}</span> per
                l'evento del{" "}
                <span className="fw-bold">
                  {moment(dataEvento).format("DD-MMM-YYYY")}
                </span>{" "}
                effettuata con successo!
              </Alert>
            )}
            {invioNOT_OK === true && (
              <Alert className="text-center rounded-pill" variant={"danger"}>
                {msg}
              </Alert>
            )}
            {alertEmpty === true && (
              <Alert className="text-center rounded-pill" variant={"secondary"}>
                {empty} {""}
                <span className="fw-bold">{eventCity}</span>
              </Alert>
            )}
          </Col>
        </Row>
        {event &&
          event.map((e) => (
            <>
              <Col
                key={e.id}
                xs={11}
                md={5}
                lg={4}
                className="border border-secondary rounded m-1 p-2 bg-light cardEvento"
              >
                <Row>
                  <Col xs={12} className="text-center">
                    {e.locale.tipolocale === "RISTORANTE" && (
                      <img
                        style={{ height: "80px", width: "100px" }}
                        src={Ristorante}
                        alt="IconaRistorante"
                      />
                    )}
                    {e.locale.tipolocale === "PIZZERIA" && (
                      <img
                        style={{ height: "80px", width: "100px" }}
                        src={Pizzeria}
                        alt="IconaPizzeria"
                      />
                    )}
                    {e.locale.tipolocale === "PUB" && (
                      <img
                        style={{ height: "80px", width: "100px" }}
                        src={Pub}
                        alt="IconaPub"
                      />
                    )}
                    {e.locale.tipolocale === "BURGER" && (
                      <img
                        style={{ height: "80px", width: "100px" }}
                        src={Burger}
                        alt="IconaBurger"
                      />
                    )}
                  </Col>
                </Row>
                <Row className="text-center">
                  <div className="fst-italic">
                    <span className="fw-bold text-uppercase">
                      {e.locale?.nomelocale}
                    </span>{" "}
                  </div>
                  <div>
                    <span>
                      <VscLocation />
                    </span>{" "}
                    {e.citta}, {e.locale?.indirizzo}
                  </div>
                </Row>
                <Row className="text-center py-2">
                  <strong>
                    {e.partita?.squadra1} vs {e.partita?.squadra2}
                  </strong>
                </Row>
                <Row xs={12} className="py-1">
                  <Col xs={6} className="text-end fst-italic">
                    {" "}
                    {e.locale.tipolocale}
                  </Col>
                  <Col xs={6} className="text-start">
                    <span className="me-2">
                      <BsCalendar3 />
                    </span>
                    <strong>{moment(e.data).format("DD-MMM-YYYY")}</strong>
                  </Col>
                </Row>
                <Row className="text-center">
                  <div> Posti Disponibili: {e.postidisponibili}</div>
                  <div>Per quanti vuoi prenotare?</div>
                </Row>
                <Row className="py-2 d-flex justify-content-center">
                  <Col xs={4} className="d-flex justify-content-center">
                    <select
                      className="rounded p-1"
                      onChange={(e) => handleSelectChange(e.target.value)}
                    >
                      {postiPrenotati.map((e) => (
                        <option key={e.id} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </Col>
                  <Col xs={4}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="success"
                        onClick={() =>
                          saveReservation(e.id, e.locale.nomelocale, e.data)
                        }
                      >
                        {" "}
                        Prenota
                      </Button>
                    </div>
                  </Col>
                </Row>
              </Col>
            </>
          ))}
      </Row>
    </Container>
  );
};

export default CardEvento;
