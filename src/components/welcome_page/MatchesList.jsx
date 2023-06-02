import { useEffect, useState } from "react";
import { Button, Col, Row, Spinner } from "react-bootstrap";
import { BsCalendarDate } from "react-icons/bs";
import { BiTime } from "react-icons/bi";
import moment from "moment";

const MatchesList = () => {
  const [matchList, setMatchList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [spinner, setSpinner] = useState(true);

  const clickBack = (n) => {
    if (page === 0) {
      setPage(0);
    } else {
      setPage(n);
    }
    setRefresh(true);
  };

  const clickForward = (n) => {
    if (page < totalPages) {
      setRefresh(true);
      setPage(n);
    } else if (page === totalPages) {
      setPage(totalPages - 1);
    }
  };

  const getPartite = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/partite/pageable?sort=data,ASC&page=${page}&size=10`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMatchList(data.content);
        setTotalPages(data.totalPages);
        setRefresh(false);
        setSpinner(false);
      } else {
        setSpinner(false);
      }
    } catch {}
  };

  useEffect(() => {
    getPartite();
  }, [page, refresh]);

  return (
    <Row className="d-flex justify-content-center align-items-center ">
      <Col
        xs={12}
        md={12}
        lg={12}
        xl={11}
        className="bg-light border border-secondary rounded py-3 bgMatch"
      >
        <Row className="justify-content-center">
          <Col xs={12} className="d-flex justify-content-center">
            {spinner === true && (
              <div>
                <Spinner animation="border" variant="secondary" />
              </div>
            )}
          </Col>
          <Col
            xs={10}
            sm={10}
            className="rounded border border-secondary text-center bg-light py-2"
          >
            <h5 className="py-2">PARTITE IN PROGRAMMA</h5>
            {matchList &&
              matchList.map((p) => (
                <Row key={p.id} className="justify-content-center mb-1">
                  <Col xs={6} sm={3} md={2} className="text-end text-md-center">
                    <span>
                      <BsCalendarDate />
                    </span>{" "}
                    {moment(p.data).format("DD-MM")}
                  </Col>
                  <Col
                    xs={6}
                    sm={3}
                    md={3}
                    className="text-start text-md-center"
                  >
                    <span>
                      <BiTime />
                    </span>{" "}
                    {p.orario}
                  </Col>
                  <Col
                    xs={12}
                    sm={6}
                    md={5}
                    className="fw-bold text-center text-sm-start text-uppercase"
                  >
                    {p.squadra1} <span className="fst-italic ">-</span>{" "}
                    {p.squadra2}
                  </Col>
                </Row>
              ))}
            <Row className="d-flex justify-content-center">
              <Col
                xs={12}
                lg={10}
                xl={7}
                className="d-flex justify-content-between align-items-center bg-light rounded py-2"
                s
              >
                <Button
                  variant="outline-secondary rounded-pill"
                  onClick={() => clickBack(page - 1)}
                >
                  INDIETRO
                </Button>
                <Button
                  variant="outline-secondary rounded-pill"
                  onClick={() => clickForward(page + 1)}
                >
                  PROSSIMI
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default MatchesList;
