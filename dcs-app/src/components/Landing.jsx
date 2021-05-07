import { Form, Container, Button, Row, Col, Image } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import uri from '../context/APIPort';
import '../style/Landing.css'
import nba from '../images/nba.png'
import nfl from '../images/nfl.png'
import mlb from '../images/mlb.png'
import nhl from '../images/nhl.png'
import ncaa from '../images/ncaa.png'
import espn from '../images/espn.png'

function Landing() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { userData, setUserData } = useContext(UserContext);
    const [failed, setFailed] = useState(false);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const loginUser = { username, password };
        const url = uri + "/assets/login";
        setFailed(false);
        try {
            await Axios.post(url, loginUser).then(loginRes => {
                setUserData({
                    token: loginRes.data.token,
                    userInfo: loginRes.data.existing
                });
                localStorage.setItem("auth-token", loginRes.data.token);
                history.push('/');
            });
        } catch (err) {
            setFailed(true);
            console.log(err);
        }
    }

    return (
        <div>
            <h1 className="landingpage mt-4">Welcome to</h1>
            <h1 className="landinglogo mt-2 mb-2"> <i className="fas fa-basketball-ball mr-2 basketball"></i> <i className="fas fa-hockey-puck mr-2 hockey"></i>DC Sports <i className="fas fa-baseball-ball ml-2 baseball"></i> <i className="fas fa-football-ball ml-2 football"></i></h1>
            {userData.token !== undefined ?<h1 className="landingpage">{userData.userInfo.fname}, you currently have a balance of {userData.userInfo.dcs} DCs</h1> : <h1 className="landingpage"> Where you can recieve sports score updates and gamble a little!</h1>}
            <h1 className="landinglogo mt-2 mb-2">So let the betting begin!</h1>
            <Container className="pt-2 col-md-6 mt-5">
                {userData.token !== undefined ? 
                <>
                    <div className="fpg">
                        {/* <h3 className="landingpagesmall mb-5">Go bet (<a href="/freebets">free</a> or <a href="/paidbets">paid</a>), <a href="/games">play games</a>, check daily scores, or get sports news in the links below</h3> */}
                        <h3 className="landingpagesmall mb-5"><a href="/games">Play games</a>, check daily scores, or get sports news in the links below</h3>
                        <Row className="">
                            <Col>
                                <a href="https://www.nba.com/" target="_blank" rel="noopener noreferrer"><Image src={nba} className="" fluid/></a>
                            </Col>
                            <Col>
                                <a href="https://www.nfl.com/" target="_blank" rel="noopener noreferrer"><Image src={nfl} className="" fluid style={{ width: "70%", height: "85%"}}/></a>
                            </Col>
                            <Col>
                                <a href="https://www.mlb.com/" target="_blank" rel="noopener noreferrer"><Image src={mlb} className="" fluid/></a>
                            </Col>
                            <Col>
                                <a href="https://www.nhl.com/" target="_blank" rel="noopener noreferrer"><Image src={nhl} className="" fluid style={{ width: "70%", height: "85%"}}/></a>
                            </Col>
                            <Col>
                                <a href="https://www.ncaa.com/" target="_blank" rel="noopener noreferrer"><Image src={ncaa} className="" fluid style={{ width: "70%", height: "85%"}}/></a>
                            </Col>
                            <Col>
                                <a href="https://www.espn.com/" target="_blank" rel="noopener noreferrer"><Image src={espn} className="" fluid/></a>
                            </Col>
                        </Row>
                    </div>
                </>
                :
                <>
                    <h1 className="text-center pt-2 landingpageform">Login Here</h1>
                    <Form className="pt-3" onSubmit={handleSubmit}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Control
                                placeholder="Username"
                                autoFocus
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="landingform"
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Control
                                placeholder="Password"
                                type={passwordShown ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="landingform"
                            />
                            <h6 onClick={togglePasswordVisiblity} className="showonly">{passwordShown ? "Hide" : "Show"}</h6>
                        </Form.Group>
                        {failed ? <h5 className="failmessage">Entered incorrect username or password</h5>: <></>}
                        <Button block size="lg" type="submit" className="loginbutton" disabled={!validateForm()}>
                            Sign In
                        </Button>
                        <h6 className="landingsu mt-2">Don't have an account? <a href="/signup" className="litsu">Sign up</a></h6>
                    </Form>
                </>
                }
            </Container>
        </div>
    )
}

export default Landing;