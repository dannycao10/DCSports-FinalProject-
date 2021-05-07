import '../style/OtherSports.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Modal, Image } from "react-bootstrap";

function OtherSports() {
    const [pgaData, setPGAData] = useState([]);
    const [action, setAction] = useState(false);

    async function getSchedule() {
        const response = await fetch("https://site.web.api.espn.com/apis/site/v2/sports/golf/leaderboard?league=pga");
        const schedule = await response.json();
        setPGAData(schedule.events);
    }

    useEffect(() => {
        getSchedule();
    }, [action])

    return (
        <div>
            <h1 className="landingpagesmall mt-2">PGA Tour (Golf)</h1>
            <hr />
            {pgaData.length == 0 ? <h1 className="landingpagesmall mt-3">There is no PGA Tour today</h1> :
                < Container >
                    <Row className="golfrow">
                        {pgaData.map((s) => {
                            return (
                                <Col className="content" xs={pgaData.length == 1 ? 12 : 6} key={s.name}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row className="">
                                                <div className="mustcenter">
                                                    <p className="pgaName">{s.name}</p>
                                                    <hr />
                                                    <span className="ml-3">{s.courses[0].name}</span> <span className="mr-3">&emsp; - &emsp;Purse: {s.displayPurse}</span>
                                                    <hr />
                                                    {s.status.type.description == "In Progress" ? <div><p className="mt-3 live">{s.competitions[0].status.type.detail}</p></div> : <div><p className={s.status.type.description == "Final" ? "mt-3 final" : "mt-3"}>{s.competitions[0].status.type.detail}</p></div>}
                                                    {s.status.type.description == "Scheduled" || s.status.type.description == "Postponed" ? <></> :
                                                        <>
                                                            <hr />
                                                            <Row className="mt-4 mb-1 golfrow">
                                                                <hr />
                                                                <Col className="golfers ml-3" xs={2}>
                                                                    <span>Pos</span>
                                                                </Col>
                                                                <Col className="golfers">
                                                                    <span>Golfers</span>
                                                                </Col>
                                                                <Col className="pgascore mr-0" xs={2}>
                                                                    <span>Thru</span>
                                                                </Col>
                                                                <Col className="pgascore mr-4" xs={2}>
                                                                    <span>Total</span>
                                                                </Col>
                                                                <hr />
                                                            </Row>
                                                            {s.competitions[0].competitors.sort((a, b) => (a.ssortOrder > b.sortOrder) ? 1 : ((b.sortOrder > a.sortOrder) ? -1 : 0)).slice(0, 50).map((c) => {
                                                                return (
                                                                    <Row className={s.status.type.description == "Final" && (c.status.position.displayName == "1" || c.status.position.displayName == "T1") ? "won mt-1 mb-1 golfrow" : "mt-1 mb-1 golfrow"} key={c.athlete.displayName}>
                                                                        <hr />
                                                                        <Col className="golfers ml-3" xs={2}>
                                                                            <span>{c.status.position.displayName}</span>
                                                                        </Col>
                                                                        <Col className="golfers">
                                                                            {c.athlete.headshot !== undefined ? <Image src={c.athlete.headshot.href} fluid style={{ width: "40px", height: "30px" }}></Image> : <></>}
                                                                            <span>{c.athlete.displayName}</span>
                                                                        </Col>
                                                                        <Col className="pgascore mr-0" xs={2}>
                                                                            <span>{c.status.displayThru == "18" ? c.status.displayValue : c.status.displayThru}</span>
                                                                        </Col>
                                                                        <Col className="pgascore mr-4" xs={2}>
                                                                            <span>{c.statistics[0].displayValue}</span>
                                                                        </Col>
                                                                        <hr />
                                                                    </Row>
                                                                )
                                                            }
                                                            )}
                                                        </>
                                                    }
                                                </div>
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

export default OtherSports;