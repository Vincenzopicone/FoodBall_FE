import { Alert, Button, Col, Modal, Row } from "react-bootstrap";
import PlaceHolderRistorante from "../assets/PlaceHolderRistorante.png";
import moment from "moment";
import "moment/locale/it";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SAVE_MY_RESERVATION } from "../../redux/action";

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
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [prenotazione, setPrenotazione] = useState();
  const refreshPersonalReservation = useSelector(
    (state) => state.show.refreshReservation
  );

  const handleClickDelete = (e) => {
    setInvioDelete(true);
    setIdDelete(e);
    handleClose();
    console.log(e);
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
        const data = await response.json();
        setMsg(data.message);
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
      <Row className="d-flex text-center justify-content-center">
        <Col xs={12} className="bg-light rounded border border-secondary py-3">
          <h2>Le mie prenotazioni</h2>
        </Col>
      </Row>
      {deleteOK === true && (
        <Row className="justify-content-center my-2">
          <Col xs={12} md={8} lg={6}>
            <Alert variant={"danger"}>
              La prenotazione è stata cancellata con successo!
            </Alert>
          </Col>
        </Row>
      )}
      <Row className=" d-flex justify-content-around border border-secondary rounded mb-1 bg-light my-2 p-3">
        {prenotazione &&
          prenotazione.map((e) => (
            <Col
              xs={12}
              md={5}
              lg={5}
              className="border border-secondary rounded m-1 cardEvento"
            >
              <Row key={e.id}>
                <Col xs={6}>
                  <img
                    style={{ height: "130px", width: "130px" }}
                    src={PlaceHolderRistorante}
                    alt="Placeholder ristorante"
                  />
                </Col>
                <Col
                  xs={6}
                  className="d-flex flex-column justify-content-center align-items-center"
                >
                  <div className="d-flex align-item-center">
                    <strong>{e.evento.locale.nomelocale}</strong>
                  </div>
                  <div>
                    {e.evento.locale.citta} - {e.evento.locale.indirizzo}
                  </div>
                  <div>
                    <div>{e.evento.locale.tipolocale}</div>
                  </div>
                </Col>
              </Row>
              <Row className="border-top py-1">
                <Col className="text-center" xs={3}>
                  DATA
                </Col>
                <Col className="text-center" xs={2}>
                  PERSONE
                </Col>
                <Col className="text-center" xs={7}>
                  PARTITA
                </Col>
              </Row>
              <Row>
                <Col className="text-center" xs={3}>
                  <strong>{moment(e.evento.data).format("DD-MMM")}</strong>
                </Col>
                <Col className="text-center" xs={2}>
                  <strong>{e.numeropersone}</strong>
                </Col>
                <Col className="text-center" xs={7}>
                  <strong>
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
