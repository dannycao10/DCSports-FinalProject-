import '../style/Hockey.css'
import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import * as All from 'react-mlb-logos';
import mlb from '../images/mlb.png'

function Baseball() {
    const [mlbdata, setMLBData] = useState([]);
    const [action, setAction] = useState(true);
    const [gameD, setGameData] = useState({});

    async function getSchedule() {
        const response = await fetch("https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1");
        const schedule = await response.json();
        setMLBData(schedule.dates[0].games);
    }

    useEffect(() => {
        getSchedule();
    }, [])

    async function getGame(id) {
        const response = await fetch("https://statsapi.mlb.com/" + id);
        const game = await response.json();
        setGameData(game.gameData);
    }

    function setlogo(name) {
        switch (name) {
            case "Arizona Diamondbacks":
                return <All.ARI />
            case "Atlanta Braves":
                return <All.ATL />
            case "Baltimore Orioles":
                return <All.BAL />
            case "Boston Red Sox":
                return <All.BOS />
            case "Chicago Cubs":
                return <All.CHC />
            case "Chicago White Sox":
                return <All.CHW />
            case "Cincinnati Reds":
                return <All.CIN />
            case "Cleveland Indians":
                return <All.CLE />
            case "Colorado Rockies":
                return <All.COL />
            case "Detroit Tigers":
                return <All.DET />
            case "Miami Marlins":
                return <All.MIA />
            case "Houston Astros":
                return <All.HOU />
            case "Kansas City Royals":
                return <All.KAN />
            case "Los Angeles Angels":
                return <All.LAA />
            case "Los Angeles Dodgers":
                return <All.LAD />
            case "Milwaukee Brewers":
                return <All.MIL />
            case "Minnesota Twins":
                return <All.MIN />
            case "New York Mets":
                return <All.NYM />
            case "New York Yankees":
                return <All.NYY />
            case "Oakland Athletics":
                return <All.OAK />
            case "Philadelphia Phillies":
                return <All.PHI />
            case "Pittsburgh Pirates":
                return <All.PIT />
            case "San Diego Padres":
                return <All.SD />
            case "San Francisco Giants":
                return <All.SF />
            case "Seattle Mariners":
                return <All.SEA />
            case "St. Louis Cardinals":
                return <All.STL />
            case "Tampa Bay Rays":
                return <All.TB />
            case "Texas Rangers":
                return <All.TEX />
            case "Toronto Blue Jays":
                return <All.TOR />
            case "Washington Nationals":
                return <All.WAS />
            default:
                return <All.MLB />
        }
    }

    return (
        <div>
            <h1 className="landingpagesmall mt-2">Today's MLB Scores <Image src={mlb} fluid style={{ width: "70px", height: "50px" }}></Image></h1>
            <hr />
            {mlbdata.length == 0 ? <h1 className="landingpagesmall mt-3">There are no MLB games today</h1> :
                < Container >
                    <Row>
                        {mlbdata.map((s) => {
                            return (
                                <Col className="content" xs={mlb.length == 1 ? 12 : 6} key={s.gamePk}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                <Col className="score">
                                                    {s.teams.away.score > s.teams.home.score && s.status.abstractGameState == "Final" ? <p className="won mb-0">{s.teams.away.team.name}</p> : <p className="mb-0">{s.teams.away.team.name}</p>}
                                                    {setlogo(s.teams.away.team.name)}
                                                    {/* {teams.map((a) => { if(a.name == s.teams.away.team.name){return <Image src={a.logo} style={{width:"40%", height:"60%"}}></Image>}})} */}
                                                </Col>
                                                <Col className="score">
                                                    {s.status.abstractGameState == "Preview" ? <div className="mb-4">&emsp;-&emsp;</div> : <div inline-text="true" className="mb-4">{s.teams.away.score > s.teams.home.score && s.status.abstractGameState == "Final" ? <span className="won">{s.teams.away.score}</span> : <span>{s.teams.away.score}</span>} <span>&emsp;-&emsp;</span> {s.teams.away.score < s.teams.home.score && s.status.abstractGameState == "Final" ? <span className="won">{s.teams.home.score}</span> : <span>{s.teams.home.score}</span>}</div>}
                                                    {s.status.abstractGameState == "Live" ? <p className="live">{s.status.abstractGameState}</p> : s.status.abstractGameState == "Final" ? s.status.detailedState == "Postponed" ? <p>{s.status.detailedState}</p> : <p className="final">{s.status.abstractGameState}</p> : <p className="preview">{s.status.abstractGameState}</p>}
                                                </Col>
                                                <Col className="score">
                                                    {s.teams.away.score < s.teams.home.score && s.status.abstractGameState == "Final" ? <p className="won mb-0">{s.teams.home.team.name}</p> : <p className="mb-0">{s.teams.home.team.name}</p>}
                                                    {setlogo(s.teams.home.team.name)}
                                                    {/* {teams.map((a) => { if(a.name == s.teams.home.team.name){return <Image src={a.logo} style={{width:"40%", height:"60%"}}></Image>}})} */}
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

export default Baseball;