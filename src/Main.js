import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import "./index.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { signInWithGoogle } from "./App";

const URL = "https://api.spacexdata.com/v3/launches/";
const years = [
  2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018,
  2019, 2020,
];

const Main = ({ launches = [], upComing, dispatch, details, login }) => {
  const fetchDispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [id, setId] = useState(0);
  const [from, setFrom] = useState(2006);
  const [to, setTo] = useState(2020);
  const [selectedYears, setSelectedYears] = useState([]);

  const search = () => {
    let yearsArr = [];
    for (let i = from; i <= to; i++) {
      yearsArr.push(parseInt(i));
    }
    setSelectedYears(yearsArr);
  };

  const handleClose = () => {
    setId(null);
    setShow(false);
  };

  const handleShow = (id) => {
    setId(id);
    setShow(true);
  };

  useEffect(() => {
    dispatch({ type: "FILTER_BY_DATE", data: selectedYears });
  }, [selectedYears]);

  useEffect(() => {
    fetch(URL + id)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("details :", data);
        fetchDispatch({ type: "LOAD_DETAILS", data });
      });
  }, [id]);

  useEffect(() => {
    fetch(URL)
      .then((resp) => resp.json())
      .then((data) => {
        console.log("DATA :", data);
        fetchDispatch({ type: "LOAD_LAUNCHES", data });
      });
  }, [upComing]);

  return (
    <section className="main">
      <Modal
        show={!login}
        onHide={handleClose}
        animation={true}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <Button
            variant="secondary"
            onClick={() => {
              signInWithGoogle();
              dispatch({ type: "HANDLE_LOGIN", data: true });
            }}
          >
            Continue with Google
          </Button>
        </Modal.Body>
      </Modal>

      <Modal
        show={show}
        onHide={handleClose}
        animation={true}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <span>{details.flight_number}</span>&emsp;&emsp;
            {details.mission_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex" }}>
          <img
            height={256}
            src={details && details.links && details.links.mission_patch_small}
          />
          <div className="details">
            <span className="modal-span">Rocket Name:&ensp;</span>
            {details && details.rocket && details.rocket.rocket_name}
            <br />
            <span className="modal-span">Launch Site:&ensp;</span>
            {details &&
              details.launch_site &&
              details.launch_site.site_name_long}
            <br />
            <span className="modal-span">Launch Date:&ensp;</span>
            {new Date(details.launch_date_utc).toLocaleString("en-GB", {
              timeZone: "UTC",
            })}
            <br />
            <span className="modal-span">Details:&ensp;</span> {details.details}
            <br />
          </div>
        </Modal.Body>
      </Modal>

      <div className="filters">
        <div className="date-filter">
          <DropdownButton
            id="dropdown-basic-button"
            title="From"
            variant="secondary"
            onSelect={(eventKey, event) => {
              event.persist();
              console.log(eventKey);
              setFrom(event.target.text);
            }}
          >
            {years.map((year) => (
              <Dropdown.Item key={year}>{year}</Dropdown.Item>
            ))}
          </DropdownButton>
          &nbsp;&nbsp;
          <DropdownButton
            id="dropdown-basic-button"
            title="To"
            variant="secondary"
            onSelect={(eventKey, event) => {
              event.persist();
              console.log(eventKey);
              setTo(event.target.text);
            }}
          >
            {years.map((year) => (
              <Dropdown.Item key={year}>{year}</Dropdown.Item>
            ))}
          </DropdownButton>
          &nbsp;&nbsp;
          <Button variant="dark" onClick={() => search()}>
            Search
          </Button>
        </div>

        <div className="filter">
          <ButtonGroup aria-label="Basic example">
            <Button
              variant="secondary"
              onClick={() => dispatch({ type: "SET_UPCOMING", data: false })}
            >
              Past
            </Button>
            <Button
              variant="secondary"
              onClick={() => dispatch({ type: "SET_UPCOMING", data: true })}
            >
              Upcoming
            </Button>
          </ButtonGroup>
        </div>
      </div>

      {launches.map(({ flight_number, mission_name, launch_year, links }) => {
        const img = links && links.mission_patch_small;
        return (
          <article
            className="launch-card"
            key={Math.random()}
            onClick={() => handleShow(flight_number)}
          >
            <img src={img} alt="image" height={256} />
            <div>
              <h4>{mission_name}</h4>
              <span>Flight Number: {flight_number}</span>&emsp;
              <span>{launch_year}</span>
            </div>
          </article>
        );
      })}
    </section>
  );
};

const mapStateToProps = (store) => {
  const { launches, upComing, details, login } = store;
  return { launches, upComing, details, login };
};

export default connect(mapStateToProps)(Main);
