import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import moment from "moment";

const CardPartita = () => {
  const token = useSelector((state) => state.app.myProfile.accessToken);
  const myProfile = useSelector((state) => state.app.myProfile.locale.id);
  const [invio, setInvio] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  const [dataSelect, setDataSelect] = useState(moment().format("YYYY-MM-DD"));
  const [matchList, setMatchList] = useState([]);
  const [numeroPostiDisponibili, setNumeroPostiDisponibili] = useState();
  const [partitaId, setPartitaId] = useState();
  const [msg, setMsg] = useState();
  const [error, setError] = useState(false);
  const [invioOK, setInvioOK] = useState(false);

  const createEvent = (p) => {
    setPartitaId(p);
    setInvio(true);
  };

  const searchMatch = (e) => {
    setDataSelect(e);
    setChangeDate(true);
  };

  const getPartite = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/partite/data/${dataSelect}`,
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
        setMatchList(data);
        setChangeDate(false);
        setError(false);
      } else {
        setChangeDate(false);
        setMsg(data.message);
        setError(true);
        setMatchList([]);
      }
    } catch {}
  };

  const postAddEvent = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/eventi/crea", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idLocale: myProfile,
          idPartita: partitaId,
          postiDisponibili: numeroPostiDisponibili,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setInvio(false);
        setInvioOK(true);
      } else {
        setInvioOK(false);
        setInvio(false);
      }
    } catch {}
  };

  useEffect(() => {
    if (changeDate === true) {
      getPartite();
    }
  }, [changeDate]);

  useEffect(() => {
    if (invio === true) {
      postAddEvent();
    }
  }, [invio]);

  return (
    <Container>
      <Row className="d-flex text-center justify-content-center">
        <Col xs={12}>
          <h2>Crea il tuo evento</h2>
        </Col>
        <Col xs={12}>
          <h5>Scegli la data</h5>
          <input
            onChange={(e) => searchMatch(e.target.value)}
            className="rounded-pill p-2 text-center"
            type="date"
            defaultValue={moment().format("YYYY-MM-DD")}
          />
        </Col>
      </Row>
      {error === true && (
        <Row className="justify-content-center my-2 text-center">
          <Col xs={12} md={8} lg={7}>
            <Alert variant={"danger"}>{msg}</Alert>
          </Col>
        </Row>
      )}
      {invioOK === true && (
        <Row className="justify-content-center my-2 text-center">
          <Col xs={12} md={8} lg={5}>
            <Alert variant={"success"}>Evento creato con successo!</Alert>
          </Col>
        </Row>
      )}
      <Row className="mt-3">
        {matchList &&
          matchList.map((p) => (
            <Col
              key={p.id}
              xs={3}
              className="border border-tertiary rounded m-1"
            >
              <Row className="border border-tertiary rounded text-center bg-dark text-light">
                <Col className="text-center ">
                  {moment(p.data).format("DD-MMMM-YYYY")}
                </Col>
              </Row>
              <Row className="py-2 align-items-center ">
                <Col xs={12} className="fw-bold text-center">
                  {p.squadra1}
                </Col>
                <Col xs={12} className="fst-italic text-center">
                  VS
                </Col>
                <Col xs={12} className="fw-bold text-center">
                  {" "}
                  {p.squadra2}
                </Col>
              </Row>
              <Row className="bg-dark text-light">
                <Col
                  xs={12}
                  className="border border-tertiary rounded text-center"
                >
                  Quanti posti disponibili?
                </Col>
              </Row>
              <Row className="justify-content-center py-2">
                <Col xs={12} className="text-center my-2">
                  <input
                    className="rounded-pill text-center"
                    type="text"
                    placeholder="Posti"
                    onChange={(e) => setNumeroPostiDisponibili(e.target.value)}
                  ></input>
                </Col>
                <Col xs={12} className="text-center">
                  <Button
                    variant="success rounded-pill"
                    onClick={() => createEvent(p.id)}
                  >
                    {" "}
                    Crea Evento
                  </Button>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default CardPartita;
