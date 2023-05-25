import { Alert, Button, Col, Modal, Row } from "react-bootstrap";
import moment from "moment";
import "moment/locale/it";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SAVE_MY_RESERVATION } from "../../redux/action";
import Burger from "../assets/Burger.png";
import Ristorante from "../assets/restaurant.png";
import Pub from "../assets/Pub.png";
import Pizzeria from "../assets/pizza.png";

const CardPrenotazione = () => {
  moment.locale("it");
  const dispatch = useDispatch();
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile);
  const prenotazione = useSelector((state) => state.app.myReservation);
  const [utente, setUtente] = useState(myProfile.username);
  const [idDelete, setIdDelete] = useState();
  const [invioDelete, setInvioDelete] = useState(false);
  const [deleteOK, setDeleteOK] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshPersonalReservation = useSelector(
    (state) => state.show.refreshReservation
  );

  const handleClickDelete = (e) => {
    setInvioDelete(true);
    setIdDelete(e);
    handleClose();
  };
  const getProfilo = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/profilo/${utente}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: SAVE_MY_RESERVATION, payload: data.prenotazioni });
      } else {
      }
    } catch (error) {}
  };
  const deleteReservation = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/prenotazione/rimuovi/${idDelete}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.json();
      if (response.ok) {
        setInvioDelete(false);
        setDeleteOK(true);
      } else {
        setDeleteOK(true);
        // const data = await response.json();
        // setMsg(data.message);
      }
    } catch {}
  };
  useEffect(() => {
    if (invioDelete === true) {
      deleteReservation();
    }
  }, [invioDelete, deleteOK]);

  useEffect(() => {
    getProfilo();
  }, [refreshPersonalReservation, invioDelete]);
  return (
    <>
      <Row className="d-flex text-center border border-secondary justify-content-center reservationSection">
        <Col
          xs={9}
          className="rounded  py-3 d-flex justify-content-center align-items-center"
        >
          <div className="bg-light rounded border border-secondary px-3 py-1">
            <h2>Le mie prenotazioni</h2>
          </div>
        </Col>
      </Row>

      <Row className=" d-flex justify-content-around border border-secondary rounded mb-1 bg-light my-2 p-3">
        {deleteOK === true && (
          <Row className="justify-content-center my-2 text-center">
            <Col xs={12} md={8} lg={5}>
              <Alert variant={"success rounded-pill"}>
                La prenotazione è stata cancellata con successo!
              </Alert>
            </Col>
          </Row>
        )}
        {prenotazione &&
          prenotazione.map((e) => (
            <Col
              key={e.id}
              xs={12}
              md={8}
              lg={8}
              className="border border-secondary rounded mx-1 my-2 cardEvento position-relative "
            >
              <span class="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-warning text-dark">
                {e.evento.locale.tipolocale}
              </span>
              <Row key={e.id} className="py-3">
                <Col xs={4} className="text-center">
                  {e.evento.locale.tipolocale === "RISTORANTE" && (
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={Ristorante}
                      alt="IconaRistorante"
                    />
                  )}
                  {e.evento.locale.tipolocale === "PIZZERIA" && (
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={Pizzeria}
                      alt="IconaPizzeria"
                    />
                  )}
                  {e.evento.locale.tipolocale === "PUB" && (
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={Pub}
                      alt="IconaPub"
                    />
                  )}
                  {e.evento.locale.tipolocale === "BURGER" && (
                    <img
                      style={{ height: "80px", width: "100px" }}
                      src={Burger}
                      alt="IconaBurger"
                    />
                  )}
                </Col>
                <Col
                  xs={8}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="d-flex align-item-center text-uppercase">
                    <strong>{e.evento.locale.nomelocale}</strong>
                  </div>
                  <div>
                    {e.evento.locale.citta} - {e.evento.locale.indirizzo}
                  </div>
                </Col>
              </Row>
              <Row className="border-top py-1">
                <Col className="text-center" xs={4} lg={2}>
                  <div>DATA</div>
                  <strong>{moment(e.evento.data).format("DD-MMM")}</strong>
                </Col>
                <Col className="text-center" xs={4} lg={2}>
                  <div>ORA</div>
                  <strong>{e.orario}</strong>
                </Col>
                <Col className="text-center" xs={4} lg={2}>
                  <div>PERSONE</div>
                  <strong>{e.numeropersone}</strong>
                </Col>
                <Col className="text-center" xs={12} lg={6}>
                  <div>PARTITA</div>
                  <strong className="text-uppercase">
                    {e.evento.partita.squadra1} vs {e.evento.partita.squadra2}
                  </strong>
                </Col>
              </Row>
              <Row className="border-top py-2 text-center">
                <Col>
                  <Button variant="danger rounded-pill" onClick={handleShow}>
                    Cancella
                  </Button>
                </Col>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Cancella prenotazione</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Sei sicuro di voler cancellare la prenotazione?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary rounded-pill"
                      onClick={handleClose}
                    >
                      Torna indietro
                    </Button>
                    <Button
                      className="rounded-pill"
                      variant={"danger"}
                      onClick={() => handleClickDelete(e.id)}
                    >
                      Cancella
                    </Button>
                  </Modal.Footer>
                </Modal>
              </Row>
            </Col>
          ))}
      </Row>
    </>
  );
};

export default CardPrenotazione;
