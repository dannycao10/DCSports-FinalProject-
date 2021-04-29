import '../style/Hockey.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Modal, Image } from "react-bootstrap";
import teams from "@nhl-api/teams";
import nhl from '../images/nhl.png'

function Hockey() {
    const [nhldata, setNHLData] = useState([]);
    const [action, setAction] = useState(true);
    const [gameD, setGameData] = useState({});

    // const getNHLData = async () => {
    //     const result = await axios({
    //         method: 'get',
    //         url: 'https://statsapi.web.nhl.com/api/v1/schedule',
    //         withCredentials: true,
    //     });
    //     setNHLData(result.dates);
    //     return result;
    // }

    async function getSchedule() {
        const response = await fetch("https://statsapi.web.nhl.com/api/v1/schedule");
        const schedule = await response.json();
        setNHLData(schedule.dates[0].games);
    }

    useEffect(() => {
        getSchedule();
    }, [])

    async function getGame(id) {
        const response = await fetch("https://statsapi.web.nhl.com" + id);
        const game = await response.json();
        setGameData(game.gameData);
    }

    //  function setGames(){
    //     nhldata.map((s) => getGame(s.link), console.log(games))
    // }

    return (
        <div>
            <h1 className="landingpagesmall mt-2">Today's NHL Scores <Image src={nhl} fluid style={{ width: "55px", height: "60px" }}></Image></h1>
            <hr />
            {nhldata.length == 0 ? <h1 className="landingpagesmall mt-3">There are no NHL games today</h1> :
            < Container >
                <Row>
                    {nhldata.map((s) => {
                        return (
                            <Col className="content" xs={nhldata.length == 1 ? 12 : 6}>
                                <Card className="mt-3 mb-3 border-0 shadow cards">
                                    <Card.Body>
                                        <Row>
                                            <Col className="score">
                                                {s.teams.away.score > s.teams.home.score && s.status.abstractGameState == "Final" ? <p className="won">{s.teams.away.team.name}</p> : <p>{s.teams.away.team.name}</p>}
                                                {teams.map((a) => { if (a.name == s.teams.away.team.name) { return <Image src={a.logo} fluid style={{ width: "55px", height: "60px" }}></Image> } })}
                                            </Col>
                                            <Col className="score">
                                                {s.status.abstractGameState == "Preview" ? <div className="mb-4">&emsp;-&emsp;</div> : <div inline-text className="mb-4">{s.teams.away.score > s.teams.home.score && s.status.abstractGameState == "Final" ? <span className="won">{s.teams.away.score}</span> : <span>{s.teams.away.score}</span>} <span>&emsp;-&emsp;</span> {s.teams.away.score < s.teams.home.score && s.status.abstractGameState == "Final" ? <span className="won">{s.teams.home.score}</span> : <span>{s.teams.home.score}</span>}</div>}
                                                {s.status.abstractGameState=="Live" ?  <p className="live">{s.status.abstractGameState}</p>: s.status.abstractGameState=="Final" ? <p className="final">{s.status.abstractGameState}</p>:<p className="preview">{s.status.abstractGameState}</p>}
                                            </Col>
                                            <Col className="score">
                                                {s.teams.away.score < s.teams.home.score && s.status.abstractGameState == "Final" ?  <p className="won">{s.teams.home.team.name}</p> : <p>{s.teams.home.team.name}</p>}
                                                {teams.map((a) => { if (a.name == s.teams.home.team.name) { return <Image src={a.logo} fluid style={{ width: "55px", height: "60px" }}></Image> } })}
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

export default Hockey;