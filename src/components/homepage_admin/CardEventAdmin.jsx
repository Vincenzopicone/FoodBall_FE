import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Modal, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";
import { BsListCheck, BsCalendarDate, BsCircle } from "react-icons/bs";
import { GiSoccerField } from "react-icons/gi";
const CardEvent = () => {
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const idLocale = useSelector((state) => state.app.myProfile.locale.id);
  const [locale, setLocale] = useState({});
  const [eventi, setEventi] = useState([]);
  const [showPrenotazione, setShowPrenotazione] = useState();
  const [deleteIdEvent, setDeleteIdEvent] = useState();
  const [show, setShow] = useState(false);
  const [showListReservation, setShowListReservation] = useState(false);
  const [invioDelete, setInvioDelete] = useState(false);
  const [deleteOK, setDeleteOK] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const clickShowReservation = (p) => {
    setShowPrenotazione(p);
    setShowListReservation(!showListReservation);
  };
  const handleClickDelete = (p) => {
    setDeleteIdEvent(p);
    setInvioDelete(true);
    handleClose();
  };

  const getEventi = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/locale/id/${idLocale}`,
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
        setLocale(data);
        setEventi(data.evento);
      } else {
      }
    } catch {}
  };
  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/eventi/rimuovi/${deleteIdEvent}`,
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
        setInvioDelete(false);
        setDeleteOK(false);
      }
    } catch {}
  };

  useEffect(() => {
    getEventi();
  }, [invioDelete]);

  useEffect(() => {
    if (invioDelete === true) {
      deleteEvent();
    }
  }, [invioDelete]);

  return (
    <Container>
      <Row className="d-flex text-center justify-content-center border border-tertiary rounded">
        <Col xs={12}>
          <h2>I nostri eventi</h2>
        </Col>
      </Row>

      <Row className=" text-center py-3">
        {deleteOK === true && (
          <Row className="justify-content-center my-2 text-center">
            <Col xs={12} md={8} lg={5}>
              <Alert variant={"success"}>
                L'evento è stato cancellato con successo!
              </Alert>
            </Col>
          </Row>
        )}
        {eventi &&
          eventi.map((e) => (
            <>
              <Col xs={12} className="border border-secondary rounded mb-3">
                <Row key={e.id} className="align-items-center ">
                  <Col xs={12} md={8} className="mb-2">
                    <Row className="">
                      <Col xs={5}>
                        <div>PARTITA</div>
                        <div className="fst-italic">
                          {" "}
                          {e.partita.squadra1} - {e.partita.squadra2}{" "}
                        </div>{" "}
                      </Col>
                      <Col xs={3}>
                        <div>
                          <BsCalendarDate />
                        </div>
                        <div>{moment(e.data).format("DD-MMM")}</div>
                      </Col>
                      <Col xs={2}>
                        {e.postidisponibili > 0 && (
                          <>
                            <div>
                              <BsCircle className="text-success rounded-circle bg-success" />
                            </div>
                            <div>{e.postidisponibili}</div>
                          </>
                        )}
                        {e.postidisponibili === 0 && (
                          <>
                            <div>
                              <BsCircle className="text-danger rounded-circle bg-danger" />
                            </div>
                            <div>{e.postidisponibili}</div>
                          </>
                        )}
                      </Col>
                      <Col xs={2}>
                        <div>
                          <BsListCheck />
                        </div>
                        <div>{e.prenotazione.length}</div>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    xs={12}
                    md={4}
                    className="d-flex justify-content-center mb-2"
                  >
                    {" "}
                    <Button
                      className="me-2"
                      onClick={() => clickShowReservation(e.id)}
                    >
                      Dettaglio
                    </Button>
                    <Button variant="danger" onClick={handleShow}>
                      Cancella
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Cancella prenotazione</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Sei sicuro di voler cancellare questo evento?
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
                  </Col>
                </Row>
                <div className="listReservation rounded border border-secondary">
                  <Row>
                    {showPrenotazione === e.id &&
                      showListReservation === true && (
                        <>
                          <Col xs={1} className="d-none d-md-inline">
                            N°
                          </Col>
                          <Col xs={1}>Data</Col>
                          <Col xs={2}>Orario</Col>
                          <Col xs={2}>Nome</Col>
                          <Col xs={2}>Persone</Col>
                          <Col xs={4}>Note</Col>
                        </>
                      )}
                  </Row>
                  <Row>
                    {showPrenotazione === e.id &&
                      showListReservation === true &&
                      e.prenotazione &&
                      e.prenotazione.map((p, i) => (
                        <>
                          <Col key={p.id} xs={1} className="d-none d-md-inline">
                            {i + 1}
                          </Col>
                          <Col xs={1}>
                            {moment(p.dataprenotazione).format("DD-MMM")}
                          </Col>
                          <Col xs={2}>{p.orario}</Col>
                          <Col xs={2}>{p.utente.name}</Col>
                          <Col xs={2}>{p.numeropersone}</Col>
                          <Col xs={4}>{p.note}</Col>
                        </>
                      ))}
                  </Row>
                </div>
              </Col>
            </>
          ))}
      </Row>
    </Container>
  );
};
export default CardEvent;
