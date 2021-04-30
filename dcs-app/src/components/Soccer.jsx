import '../style/Football.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import nfl from '../images/nfl.png'
import ncaa from '../images/ncaa.png'
import { Card, Container, Row, Col, Modal, Image } from "react-bootstrap";

function Soccer() {
    const [premData, setPREMData] = useState([]);
    const [ligaData, setLIGAData] = useState([]);
    const [gerData, setGERData] = useState([]);
    const [itaData, setITAData] = useState([]);
    const [fraData, setFRAData] = useState([]);
    const [champData, setCHAMPData] = useState([]);
    const [action, setAction] = useState(true);

    async function getCHAMPSchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/uefa.champions/scoreboard");
        const schedule = await response.json();
        setCHAMPData(schedule.events);
    }

    async function getENGSchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard");
        const schedule = await response.json();
        setPREMData(schedule.events);
    }

    async function getLIGASchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard");
        const schedule = await response.json();
        setLIGAData(schedule.events);
    }

    async function getGERSchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/ger.1/scoreboard");
        const schedule = await response.json();
        setGERData(schedule.events);
    }

    async function getITASchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/ita.1/scoreboard");
        const schedule = await response.json();
        setITAData(schedule.events);
    }

    async function getFRASchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/soccer/fra.1/scoreboard");
        const schedule = await response.json();
        setFRAData(schedule.events);
    }

    useEffect(() => {
        getENGSchedule();
    }, [])

    useEffect(() => {
        getLIGASchedule();
    }, [])

    useEffect(() => {
        getGERSchedule();
    }, [])

    useEffect(() => {
        getITASchedule();
    }, [])

    useEffect(() => {
        getFRASchedule();
    }, [])

    useEffect(() => {
        getCHAMPSchedule();
    }, [])


    return (
        <div>
            <h1 className="landingpagesmall mt-2">Today's Champions League Scores</h1>
            <hr />
            {champData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no Champions League games today</h1> :
                < Container >
                    <Row>
                        {champData.map((s) => {
                            return (
                                <Col className="content" xs={champData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }

            <h1 className="landingpagesmall mt-5">Today's Premier League Scores</h1>
            <hr />
            {premData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no Premier League games today</h1> :
                < Container >
                    <Row>
                        {premData.map((s) => {
                            return (
                                <Col className="content" xs={premData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }
            <h1 className="landingpagesmall mt-5">Today's La Liga Scores</h1>
            <hr />
            {ligaData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no La Liga games today</h1> :
                < Container >
                    <Row>
                        {ligaData.map((s) => {
                            return (
                                <Col className="content" xs={ligaData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }

            <h1 className="landingpagesmall mt-5">Today's Bundesliga Scores</h1>
            <hr />
            {gerData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no Bundesliga games today</h1> :
                < Container >
                    <Row>
                        {gerData.map((s) => {
                            return (
                                <Col className="content" xs={gerData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }

            <h1 className="landingpagesmall mt-5">Today's Serie A Scores</h1>
            <hr />
            {itaData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no Serie A games today</h1> :
                < Container >
                    <Row>
                        {itaData.map((s) => {
                            return (
                                <Col className="content" xs={itaData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }

            <h1 className="landingpagesmall mt-5">Today's Ligue 1 Scores</h1>
            <hr />
            {fraData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no Ligue 1 games today</h1> :
                < Container >
                    <Row>
                        {fraData.map((s) => {
                            return (
                                <Col className="content" xs={fraData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) < parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[0].team.displayName}</p> : <p>{s.competitions[0].competitors[0].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[0].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                        }
                        )}
                    </Row>
                </Container >
            }
        </div>
    )
}

export default Soccer;