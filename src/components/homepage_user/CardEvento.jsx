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

const CardEvento = () => {
  moment.locale("it");
  // const dispatch = useDispatch();
  // const dateToStart = moment().format("YYYY-MM-DD");
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const [eventState, setEventState] = useState(false);
  const [eventStateName, setEventStateName] = useState(false);
  const [eventStateType, setEventStateType] = useState(false);
  const [utente, setUtente] = useState(myProfile.username);
  const [event, setEvent] = useState([]);
  const [eventCity, setEventCity] = useState("");
  const [eventLocale, setEventLocale] = useState("");
  // const showCardEventState = useSelector((state) => state.show.showCardEvent);
  // const [showCardEventType, setShowCardEventType] = useState(false);
  // const [showCardEventNameLocale, setShowCardEventNameLocale] = useState(false);
  const [postiSelezionati, setPostiSelezionati] = useState(1);
  const [orarioPrenotazione, setOrarioPrenotazione] = useState();
  const [notePrenotazione, setNotePrenotazione] = useState("");
  const [invioReservation, setInvioReservation] = useState(false);
  const [invioOK, setInvioOK] = useState(false);
  const [invioNOT_OK, setInvioNOT_OK] = useState(false);
  const [msg, setMsg] = useState("");
  const [locale, setLocale] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [empty, setEmpty] = useState("");
  const [alertEmpty, setAlertEmpty] = useState(false);
  const [tipoLocale, setTipoLocale] = useState("");
  const [ricercaPerCittà, setRicercaPerCittà] = useState(true);
  const [ricercaPerNomeLocale, setRicercaPerNomeLocale] = useState(false);

  // const [pageable, setPageable] = useState(0);
  const postiPrenotati = [];

  const clickShowEvent = () => {
    setEventState(true);
    setEventStateType(false);
  };
  const clickShowEventName = () => {
    setEventStateName(true);
    setEventStateType(false);
  };
  const handleChangeFilterType = (tipo) => {
    if (tipo === "ALL") {
      setEventState(true);
    } else {
      setTipoLocale(tipo);
      setEventStateType(true);
    }
  };

  const searchByCity = () => {
    setRicercaPerCittà(true);
    setRicercaPerNomeLocale(false);
  };
  const searchByNomeLocale = () => {
    setRicercaPerCittà(false);
    setRicercaPerNomeLocale(true);
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

  const handleChangeEvent = (e) => {
    setEventCity(e);
    setAlertEmpty(false);
  };

  const handleChangeEventLocale = (e) => {
    setEventLocale(e);
    setAlertEmpty(false);
  };
  const handleSelectChange = (e) => {
    setPostiSelezionati(e);
    setInvioNOT_OK(false);
    setInvioOK(false);
  };
  const handleSelectChangeTime = (e) => {
    setOrarioPrenotazione(e);
    console.log(e);
    setInvioNOT_OK(false);
    setInvioOK(false);
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
            orario: orarioPrenotazione,
            note: notePrenotazione,
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
        `http://localhost:8080/api/eventi/citta/${eventCity}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setEvent(data);
        setEventState(false);
        setAlertEmpty(false);
        if (data.empty === true) {
          setEmpty("Siamo spiacenti, ma non ci sono eventi a");
          setAlertEmpty(true);
        }
      } else {
        setEventState(false);
        setEmpty("Siamo spiacenti, ma non ci sono eventi a");
        setAlertEmpty(true);
      }
    } catch {}
  };
  const getEventByCityAndType = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/citta/${eventCity}/tipolocale/${tipoLocale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEvent(data);
        setAlertEmpty(false);
        setEventStateType(false);
        if (data.empty === true) {
          setEmpty("Siamo spiacenti, ma non ci sono eventi a");
          setAlertEmpty(true);
        }
      } else {
        setEmpty("Siamo spiacenti, ma non ci sono eventi a");
        setAlertEmpty(true);
        setEventStateType(false);
      }
    } catch {}
  };
  const getEventByLocale = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/nomelocale/${eventLocale}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setEvent(data);
        setEventStateName(false);
        setAlertEmpty(false);
        if (data.empty === true) {
          setEmpty("Siamo spiacenti, ma non ci sono eventi a");
          setAlertEmpty(true);
        }
      } else {
        setEventStateName(false);
      }
    } catch {
      setEventStateType(false);
    }
  };

  useEffect(() => {
    if (eventState === true) {
      getEventByCity();
    }
  }, [eventState, invioOK]);

  useEffect(() => {
    if (eventStateType === true) {
      getEventByCityAndType();
    }
  }, [eventStateType]);

  useEffect(() => {
    if (eventStateName === true) {
      getEventByLocale();
    }
  }, [eventStateName]);

  useEffect(() => {
    if (invioReservation === true) {
      postAddRservation();
    }
  }, [invioReservation]);
  return (
    <Container fluid>
      <Row className="border border-secondary rounded justify-content-center searchSection">
        <Col
          xs={9}
          md={7}
          lg={5}
          xxl={4}
          className="text-center d-flex flex-column justify-content-center p-3"
        >
          <div className="d-flex flex-column bg-light p-3 rounded">
            <h5 className="fw-bold">Scegli il tuo evento</h5>
            <h5 className="fw-bold">e prenota un tavolo</h5>
            <input
              className="rounded p-1 mb-1 text-center rounded-pill"
              type="text"
              placeholder="Ricerca per città "
              onChange={(e) => handleChangeEvent(e.target.value)}
              onClick={() => searchByCity()}
            ></input>
            <h6>oppure</h6>
            <input
              className="rounded p-1 mb-2 text-center rounded-pill"
              type="text"
              placeholder="Ricerca per nome del locale"
              onChange={(e) => handleChangeEventLocale(e.target.value)}
              onClick={() => searchByNomeLocale()}
            ></input>
            {ricercaPerCittà === true && (
              <Button
                variant={"secondary rounded-pill"}
                onClick={() => clickShowEvent()}
              >
                {" "}
                <span>
                  <BsSearch />
                </span>{" "}
                Cerca
              </Button>
            )}
            {ricercaPerNomeLocale === true && (
              <Button
                variant={"secondary rounded-pill"}
                onClick={() => clickShowEventName()}
              >
                {" "}
                <span>
                  <BsSearch />
                </span>{" "}
                Cerca
              </Button>
            )}
          </div>
        </Col>
      </Row>
      <Row className="py-2 border border-secondary justify-content-center align-items-baseline bg-light rounded py-2 mt-2">
        <Col xs={12} md={6} className="text-center mb-1">
          <h6>
            Ecco gli eventi a: <strong>{event[0]?.citta}</strong>
          </h6>
        </Col>
        <Col
          xs={12}
          md={6}
          className="text-center mb-1 d-flex justify-content-center align-items-baseline"
        >
          <h6>Filtra per </h6>
          <select
            className="ms-2 rounded text-center"
            onChange={(e) => handleChangeFilterType(e.target.value)}
          >
            <option selected value={"ALL"}>
              TUTTI
            </option>
            <option value={"PIZZERIA"}>PIZZERIA</option>
            <option value={"PUB"}>PUB</option>
            <option value={"BURGER"}>BURGER</option>
            <option value={"RISTORANTE"}>RISTORANTE</option>
          </select>
        </Col>
      </Row>

      <Row className="d-flex border border-secondary bg-light justify-content-around rounded py-3 my-2 bgSearch">
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
                lg={5}
                xl={4}
                className="border  rounded m-1 p-2 cardEvento"
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
                  <div> POSTI DISPONIBILI: {e.postidisponibili}</div>
                </Row>
                <Row className="text-center align-items-center">
                  <Col xs={8} className="text-end">
                    Per quanti vuoi prenotare?
                  </Col>
                  <Col xs={2} className="d-flex justify-content-center">
                    <select
                      className="rounded p-1"
                      onChange={(e) => handleSelectChange(e.target.value)}
                    >
                      {postiPrenotati.map((e) => (
                        <option defaultValue={1} key={e.id} value={e}>
                          {e}
                        </option>
                      ))}
                    </select>
                  </Col>
                </Row>
                <Row className="text-center align-items-center mt-2">
                  <Col xs={8} className="text-end">
                    A che ora vuoi prenotare?
                  </Col>
                  <Col xs={4} className="d-flex justify-content-center">
                    <input
                      className="rounded p-1"
                      defaultValue={"19:30"}
                      type="time"
                      onChange={(e) => handleSelectChangeTime(e.target.value)}
                    ></input>
                  </Col>
                </Row>
                <Row className="py-2 d-flex justify-content-center">
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
