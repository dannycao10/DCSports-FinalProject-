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
                    <Row>
                        {pgaData.map((s) => {
                            return (
                                <Col className="content" xs={pgaData.length == 1 ? 12 : 6}>
                                    <Card className="mt-3 mb-3 border-0 shadow cards">
                                        <Card.Body>
                                            <Row>
                                                {console.log(s.competitions[0].competitors[0])}
                                                <div className="mustcenter">
                                                    <p className="pgaName">{s.name}</p>
                                                    <span className="ml-3">Prize Pool: {s.displayPurse}</span> <span className="mr-3">&emsp; - &emsp;{s.courses[0].name}</span>
                                                    <p className="mt-3">(Show Top 50 Players)</p>
                                                    { s.competitions[0].competitors.slice(0, 50).map((c) =>{
                                                        return(
                                                        <Row>
                                                            <Col>
                                                            {c.athlete.headshot !== undefined ? <Image src={c.athlete.headshot.href} fluid style={{ width: "40px", height: "30px" }}></Image>: <></>}
                                                            <span>{c.athlete.displayName}</span>
                                                            </Col>
                                                            <Col>
                                                            <span>{c.score.displayValue}</span>
                                                            </Col>
                                                        </Row>
                                                        )
                                                    }
                                                    )}
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