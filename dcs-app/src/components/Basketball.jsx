import '../style/Basketball.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import nba from '../images/nba.png'
import ncaa from '../images/ncaa.png'
import { Card, Container, Row, Col, Modal, Image } from "react-bootstrap";
import * as All from 'react-nba-logos';

function Basketball() {
    const [nbaData, setNBAData] = useState([]);
    const [ncaaData, setNCAAData] = useState([]);
    const [action, setAction] = useState(true);

    async function getSchedule() {
        let date = new Date()
        date.setHours(date.getHours() - 7);
        date = date.toISOString().split('T')[0].replace('-', '').split('T')[0].replace('-', '');
        const response = await fetch("http://data.nba.net/10s/prod/v2/" + date + "/scoreboard.json");
        const schedule = await response.json();
        setNBAData(schedule.games);
    }

    async function getNCAASchedule() {
        const response = await fetch("http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/scoreboard");
        const schedule = await response.json();
        setNCAAData(schedule.events);
    }

    useEffect(() => {
        getSchedule();
    }, [])

    useEffect(() => {
        getNCAASchedule();
    }, [])

    function setlogo(name) {
        switch (name) {
            case "ATL":
                return <All.ATL />
            case "BKN":
                return <All.BKN />
            case "BOS":
                return <All.BOS />
            case "CHA":
                return <All.CHA />
            case "CHI":
                return <All.CHI />
            case "CLE":
                return <All.CLE />
            case "DAL":
                return <All.DAL />
            case "DEN":
                return <All.DEN />
            case "DET":
                return <All.DET />
            case "GSW":
                return <All.GSW />
            case "HOU":
                return <All.HOU />
            case "IND":
                return <All.IND />
            case "LAC":
                return <All.LAC />
            case "LAL":
                return <All.LAL />
            case "MEM":
                return <All.MEM />
            case "MIA":
                return <All.MIA />
            case "MIL":
                return <All.MIL />
            case "MIN":
                return <All.MIN />
            case "NOP":
                return <All.NOP />
            case "NYK":
                return <All.NYK />
            case "OKC":
                return <All.OKC />
            case "ORL":
                return <All.ORL />
            case "PHI":
                return <All.PHI />
            case "PHX":
                return <All.PHX />
            case "POR":
                return <All.POR />
            case "SAC":
                return <All.SAC />
            case "SAS":
                return <All.SAS />
            case "TOR":
                return <All.TOR />
            case "UTA":
                return <All.UTA />
            case "WAS":
                return <All.WAS />
            default:
                return <All.LAL />
        }
    }

    return (
        <div>
            <h1 className="landingpagesmall mt-2">Today's NBA Scores <Image src={nba} fluid style={{ width: "80px", height: "60px" }}></Image></h1>
            <hr />
            {nbaData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no NBA games today</h1> :
                < Container >
                    <Row>
                        {nbaData.map((s) => {
                            return (
                                <Col className="content" xs={nbaData.length == 1 ? 12 : 6} key={s.gameId}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {!s.isGameActivated && s.period.current == 4 && s.vTeam.score > s.hTeam.score ? <p className="mb-0 won">{s.vTeam.triCode}</p> : <p className="mb-0">{s.vTeam.triCode}</p>}
                                                    {setlogo(s.vTeam.triCode)}
                                                </Col>
                                                <Col className="score">
                                                    <div className="mb-4">{!s.isGameActivated && s.period.current == 4 && s.vTeam.score > s.hTeam.score ? <span className="won">{s.vTeam.score}</span> : <span>{s.vTeam.score}</span>}<span>&emsp;-&emsp;</span>{!s.isGameActivated && s.period.current == 4 && s.hTeam.score > s.vTeam.score ? <span className="won">{s.hTeam.score}</span> : <span>{s.hTeam.score}</span>}</div>
                                                    {s.isGameActivated ? s.period.isEndOfPeriod ? s.period.isHalftime ? <span className="live">Halftime</span> : <span className="live">End of Quarter {s.period.current}</span> : <div><span className="live">{s.clock}</span><span className="live">&emsp;Quarter {s.period.current}</span></div> : s.period.current == 4 ? <span className="final">Final</span> : <span>{s.startTimeEastern}</span>}
                                                </Col>
                                                <Col className="score">
                                                    {!s.isGameActivated && s.period.current == 4 && s.hTeam.score > s.vTeam.score ? <p className="mb-0 won">{s.hTeam.triCode}</p> : <p className="mb-0">{s.hTeam.triCode}</p>}
                                                    {setlogo(s.hTeam.triCode)}
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
            <h1 className="landingpagesmall mt-5">Today's NCAAMB Scores <Image src={ncaa} fluid style={{ width: "60px", height: "60px" }}></Image></h1>
            <hr />
            {ncaaData.length == 0 ? <h1 className="landingpagesmall mt-3">There are no NCAAMB games today</h1> :
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
                                                    {s.competitions[0].status.type.completed ? parseInt(s.competitions[0].competitors[1].score) > parseInt(s.competitions[0].competitors[0].score) ? <div><span className="won">{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span className="won">{s.competitions[0].competitors[0].score}</span></div> : <div><span>{s.competitions[0].competitors[1].score}</span> <span>&emsp;-&emsp;</span> <span>{s.competitions[0].competitors[0].score}</span></div>}
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

export default Basketball;