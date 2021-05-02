import '../style/Football.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import nfl from '../images/nfl.png'
import ncaa from '../images/ncaa.png'
import { Card, Container, Row, Col, Modal, Image } from "react-bootstrap";

function Football() {
    const [nflData, setNFLData] = useState([]);
    const [ncaaData, setNCAAData] = useState([]);
    const [action, setAction] = useState(true);

    async function getSchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard");
        const schedule = await response.json();
        setNFLData(schedule.events);
    }

    async function getNCAASchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/football/college-football/scoreboard");
        const schedule = await response.json();
        setNCAAData(schedule.events);
    }

    useEffect(() => {
        getSchedule();
    }, [])

    useEffect(() => {
        getNCAASchedule();
    }, [])

    return (
        <div>
            <h1 className="landingpagesmall mt-2">Weekly NFL Scores <Image src={nfl} fluid style={{ width: "50px", height: "60px" }}></Image></h1>
            <hr />
            {nflData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no NFL games today</h1> :
                < Container >
                    <Row>
                        {nflData.map((s) => {
                            return (
                                <Col className="content" xs={nflData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled"  || s.competitions[0].status.type.description == "Postponed" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
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
            <h1 className="landingpagesmall mt-5">Weekly CFB Scores <Image src={ncaa} fluid style={{ width: "60px", height: "60px" }}></Image></h1>
            <hr />
            {ncaaData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no CFB games today</h1> :
                < Container >
                    <Row>
                        {ncaaData.map((s) => {
                            return (
                                <Col className="content" xs={ncaaData.length == 1 ? 12 : 6} key={s.id}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed && parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <p className="won">{s.competitions[0].competitors[1].team.displayName}</p> : <p>{s.competitions[0].competitors[1].team.displayName}</p>}
                                                    <Image src={s.competitions[0].competitors[1].team.logo} fluid style={{ width: "55px", height: "60px" }}></Image>
                                                </Col>
                                                <Col className="score">
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : s.competitions[0].status.type.description == "Scheduled" ? <span>-</span> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
                                                    {s.competitions[0].status.type.completed ? <p className="final mt-4">Final</p> : s.competitions[0].status.type.description == "Scheduled" || s.competitions[0].status.type.description == "Postponed" ? <p className="mt-4">{s.competitions[0].status.type.detail}</p> : s.competitions[0].status.type.description == "Halftime"? <p className="mt-4 live">Haftime</p> : <p className="mt-4 live">{s.competitions[0].status.displayClock}</p>}
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

export default Football;