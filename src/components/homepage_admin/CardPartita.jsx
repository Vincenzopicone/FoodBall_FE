import { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
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
      } else {
        setChangeDate(false);
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
      } else {
      }
    } catch {}
  };

  useEffect(() => {
    getPartite();
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
            className="rounded p-1"
            type="date"
          />
        </Col>
      </Row>
      <Row className="border border-tertiary rounded mt-3">
        {matchList &&
          matchList.map((p) => (
            <Col key={p.id} xs={4} className="border border-tertiary rounded">
              <Row className="border border-tertiary rounded text-center">
                <Col className="text-center">{p.data}</Col>
              </Row>
              <Row className="py-2">
                <Col xs={12} className="fw-bold text-center">
                  {p.squadra1}
                </Col>
                <Col xs={12}>VS</Col>
                <Col xs={12}> {p.squadra2}</Col>
                <Col xs={12} className="border border-tertiary rounded">
                  Quanti posti disponibili?
                </Col>
                <Col xs={12}>
                  <input
                    className="rounded"
                    type="number"
                    placeholder="Inserisci il numero"
                    onChange={(e) => setNumeroPostiDisponibili(e.target.value)}
                  ></input>
                  <Button variant="success" onClick={() => createEvent(p.id)}>
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
