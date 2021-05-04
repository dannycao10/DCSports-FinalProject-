import { Form, Container, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import '../style/Game.css'
import uri from '../context/APIPort';
import cards from '../images/cards.png'
import bitcoin from '../images/bitcoin.png'
import gold from '../images/dollarcoin.png'
import flipping from '../images/Flipping.png'

function Game() {
    const { userData, setUserData } = useContext(UserContext);
    const [dcs, setDCS] = useState(userData.userInfo.dcs);
    const [action, setAction] =useState(true)
    useEffect(() => { setDCS(userData.userInfo.dcs) }, [userData.userInfo.dcs])

    const handleChange = async (e, amount) => {
        // e.preventDefault();
        const updatedDCS = {
            user: userData.userInfo._id,
            dcs: dcs + amount
        }
        setDCS(dcs + amount);
        await Axios.put(uri + "/assets/updateDCS", updatedDCS)
    }

    const [cf, setCF] = useState(false);
    const [coinflip, setCoinFlip] = useState("Heads")
    const [bet, setBet] = useState();
    const [coinside, setCoinSide] = useState("Heads");
    const [win, setWin] = useState(false);
    const [winam, setWinAm] = useState(0);
    const handleShowCF = () => setCF(true);
    const handleCloseCF = () => setCF(false);

    const coinToss = (e) => {
        setCoinFlip("Flipping Coin...");
        setTimeout(function () {
            if (Math.random() < 0.5) {
                setCoinFlip("Heads");
                if(coinside=="Heads"){
                    setWin(true)
                    setWinAm(bet)
                    handleChange(e, parseInt(bet))
                } else{
                    setWin(false)
                    handleChange(e,parseInt(-bet))
                }
            } else {
                setCoinFlip("Tails");
                if(coinside=="Tails"){
                    setWin(true)
                    setWinAm(bet)
                    handleChange(e, parseInt(bet))
                } else{
                    setWin(false)
                    handleChange(e,parseInt(-bet))
                }
            }
        }, 2000);
    }

    return (
        <div>
            {/* <Button onClick={(e)=>handleChange(e, 100)}>Test</Button> */}

            <h1 className="gamepage"><i className="fas fa-gamepad "></i> Welcome to all the games! <i className="fas fa-gamepad "></i></h1>
            <p className="gamepagesm">(Warning your $ on the top will update upon refresh of page)</p>
            <hr />
            <Row className="mt-5">
                <Col className="text-center gcontent">
                    <Button className="loginbutton gbutton" onClick={handleShowCF}>Coin Flip <br /> <i className="fab fa-bitcoin gicon"></i></Button>
                </Col>
                <Col className="text-center gcontent">
                    <Button className="loginbutton gbutton">Dice Roll <br /> <i className="fas fa-dice gicon"></i></Button>
                </Col>
                <Col className="text-center gcontent">
                    <Button className="loginbutton gbutton">Blackjack <br /> <Image src={cards} fluid style={{ width: "90px", height: "90px" }}></Image></Button>
                </Col>
            </Row>

            <Modal show={cf} onHide={handleCloseCF} size="lg">
                <Modal.Header closeButton={handleCloseCF}>
                    <Modal.Title className="gametitle ">Coin Flip <i className="fab fa-bitcoin"></i></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="gcontent text-center">
                        <h4 className="mt-2">Welcome to coin flip, where you bet on which side the coin will land on</h4>
                        <h5 className="gold">( Win: Double Money&emsp;-&emsp;Lose: Lose Total Bet )</h5>
                        <h5 className="gold">( Heads: Bitcoin&emsp;-&emsp;Tails: The Dollar )</h5>
                        {win && coinflip != "Flipping Coin..."? <h4 className="mt-3 mb-3">{coinflip} (You won ${winam})</h4> : <h4 className="mt-3 mb-3">{coinflip}</h4>}
                        {coinflip == "Heads" ? <Image src={bitcoin} fluid style={{ width: "400px", height: "400px" }}></Image> : coinflip == "Tails" ? <Image src={gold} fluid style={{ width: "400px", height: "400px" }}></Image> : <Image src={flipping} fluid style={{ width: "400px", height: "400px" }}></Image>}
                        <br />
                        <h5 className="gold mt-2">Your wallet:&emsp;{dcs} DCs</h5>
                        <Form.Row className="mt-1 coininput">
                            <Form.Group as={Col} size="md" controlId="betamount" className="ml-5">
                                <Form.Label>Bets</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="How much do you want to bet"
                                    value={bet}
                                    onChange={(e) => setBet(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} size="lg" controlId="unc" className="mr-5">
                                <Form.Label>Heads or Tails</Form.Label>
                                <Form.Control
                                    as="select"
                                    placeholder="No"
                                    value={coinside}
                                    onChange={(e) => setCoinSide(e.target.value)}
                                >
                                    {['Heads', 'Tails'].map(s => <option key={s} value={s}>{s}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        {bet > dcs ? <h4 className="red">You don't have that much money to bet</h4> : 
                        <Button onClick={(e)=>coinToss(e)} className="loginbutton mt-2" disabled={bet==null}>
                            Coin Toss
                        </Button>}
                    </div>
                </Modal.Body>
                <Modal.Footer className="">
                    <Button variant="primary" onClick={handleCloseCF} className="loginbutton">
                        I love this game
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Game;