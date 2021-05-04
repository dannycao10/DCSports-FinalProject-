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
import flipping from '../images/flipping.gif'
import logo from '../images/dannydino.png'
import rolling from '../images/rolling.gif'

function Game() {
    const { userData, setUserData } = useContext(UserContext);
    const [dcs, setDCS] = useState(userData.userInfo.dcs);
    const [action, setAction] = useState(true)
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
                if (coinside == "Heads") {
                    setWin(true)
                    setWinAm(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWin(false)
                    handleChange(e, parseInt(-bet))
                }
            } else {
                setCoinFlip("Tails");
                if (coinside == "Tails") {
                    setWin(true)
                    setWinAm(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWin(false)
                    handleChange(e, parseInt(-bet))
                }
            }
        }, 2000);
    }

    const [dr, setDR] = useState(false);
    const [drg, setDRG] = useState("Single Player")
    const [drEvent, setDRE] = useState("1")
    const [drEventcpu, setDREcpu] = useState("Lower")
    const [dice, setDice] = useState(1)
    const [dice2, setDice2] = useState(1)
    const [cputot, setCPU] = useState(0)
    const [myturn, setMyturn] = useState(false)
    const [winDR, setWinDR] = useState(false)
    const [winDR2, setWinDR2] = useState(false)
    const [winamdr2, setWinAMDR2] = useState(0)
    const [winamdr, setWinAMDR] = useState(0)
    const [started, setStarted] = useState (false)
    const handleShowDR = () => setDR(true);
    const handleCloseDR = () => setDR(false);

    const diceRoll = (e) => {
        setDice(7);
        setTimeout(function () {
            const rolled = Math.random() * 100;
            if (rolled < 16.67) {
                setDice(1);
                if (drEvent == "1") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Odd") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled < 33.33) {
                setDice(2);
                if (drEvent == "2") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Even") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled < 50) {
                setDice(3);
                if (drEvent == "3") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Odd") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled < 66.67) {
                setDice(4);
                if (drEvent == "4") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Even") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled < 83.33) {
                setDice(5);
                if (drEvent == "5") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Odd") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            } else {
                setDice(6);
                if (drEvent == "6") {
                    setWinDR(true)
                    setWinAMDR(bet * 6)
                    handleChange(e, parseInt(bet) * 5)
                } else if (drEvent == "Even") {
                    setWinDR(true)
                    setWinAMDR(bet * 2)
                    handleChange(e, parseInt(bet))
                } else {
                    setWinDR(false)
                    handleChange(e, parseInt(-bet))
                }
            }
        }, 2000);
    }

    const diceRoll2 = (e) => {
        if(myturn){setCPU(dice + dice2)}
        let store = dice + dice2;
        setDice(7);
        setDice2(7);
        setTimeout(function () {
            const rolled = Math.random() * 100;
            const rolled2 = Math.random() * 100;
            if (rolled < 16.67) {
                setDice(1);
                if(myturn){
                    store = store - 1
                }
            } else if (rolled < 33.33) {
                setDice(2);
                if(myturn){
                    store = store - 2
                }
            } else if (rolled < 50) {
                setDice(3);
                if(myturn){
                    store = store - 3
                }
            } else if (rolled < 66.67) {
                setDice(4);
                if(myturn){
                    store = store - 4
                }
            } else if (rolled < 83.33) {
                setDice(5);
                if(myturn){
                    store = store - 5
                }
            } else {
                setDice(6);
                if(myturn){
                    store = store - 6
                }
            }
            if (rolled2 < 16.67) {
                setDice2(1);
                if(myturn && store - 1 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 1 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 1 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled2 < 33.33) {
                setDice2(2);
                if(myturn && store - 2 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 2 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 2 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled2 < 50) {
                setDice2(3);
                if(myturn && store - 3 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 3 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 3 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled2 < 66.67) {
                setDice2(4);
                if(myturn && store - 4 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 4 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 4 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            } else if (rolled2 < 83.33) {
                setDice2(5);
                if(myturn && store - 5 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 5 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 5 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            } else {
                setDice2(6);
                if(myturn && store - 6 < 0 && drEventcpu == "Higher"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 6 > 0 && drEventcpu == "Lower"){
                    setWinDR2(true)
                    setWinAMDR2(bet * 1.5)
                    handleChange(e, parseInt(bet) * 0.5)
                } else if (myturn && store - 6 == 0){
                    setWinDR2(true)
                    setWinAMDR2(bet * 10)
                    handleChange(e, parseInt(bet)*9)
                } else if(myturn) {
                    setWinDR2(false)
                    handleChange(e, parseInt(-bet))
                }
            }
            setMyturn(!myturn)
            if(started == false){
                setStarted(true)
            }
        }, 2000);
    }

    return (
        (userData.token !== undefined) ?
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
                        <Button className="loginbutton gbutton" onClick={handleShowDR}>Dice Roll <br /> <i className="fas fa-dice gicon"></i></Button>
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
                            {win && coinflip != "Flipping Coin..." ? <h4 className="mt-3 mb-3">{coinflip} (You won ${winam})</h4> : <h4 className="mt-3 mb-3">{coinflip}</h4>}
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
                            {bet > dcs || bet < 0 ? <h4 className="red">You don't have that much money to bet or bet amount less than 0</h4> :
                                <Button onClick={(e) => coinToss(e)} className="loginbutton mt-2" disabled={bet == null}>
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

                <Modal show={dr} onHide={handleCloseDR} size="lg">
                    <Modal.Header closeButton={handleCloseDR}>
                        <Modal.Title className="gametitle ">Dice Roll <i className="fas fa-dice"></i></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="gcontent text-center">
                            {drg == "Single Player" ?
                                <>
                                    <h4 className="mt-2">Welcome to dice roll single player, where you bet on the side of the die</h4>
                                    <h5 className="gold">Win: Double Money when betting even or odd, x6 money on numbers</h5>
                                    <h5 className="gold">Lose: Lose Total Bet</h5>
                                </> :
                                <>
                                    <h4 className="mt-2">Welcome to dice roll against the computer, where try to bet against the cpu</h4>
                                    <h5 className="gold">CPU will roll 2 dice, you bet on if you're going to roll lower or higher</h5>
                                    <h5 className="gold">( Win: x1.5 Money&emsp;-&emsp;Lose: Lose Total Bet )</h5>
                                    <h5 className="gold">( If you roll the same number as the cpu you get x10 )</h5>
                                </>}
                            {dice == 7 ? <h4 className="mt-3 mb-2">Rolling Die ... </h4> : drg == "Single Player" ? winDR ? <h4 className="mt-3 mb-2">You rolled a {dice} and won ${winamdr}</h4> : <h4 className="mt-3 mb-2">You rolled a {dice}</h4> : !myturn ? winDR2 ? <h4 className="mt-3 mb-2">CPU rolled {cputot}, and you rolled {dice + dice2} (You won ${winamdr2})</h4> :started ? <h4 className="mt-3 mb-2">CPU rolled {cputot}, and you rolled {dice + dice2}</h4> : <h4 className="mt-3 mb-2">Press New Game to Begin</h4> : <h4 className="mt-3 mb-2">CPU rolled {dice + dice2}</h4>}
                            {dice == 1 ? <i className="fas fa-dice-one dice"></i> : dice == 2 ? <i className="fas fa-dice-two dice"></i>
                                : dice == 3 ? <i className="fas fa-dice-three dice"></i> : dice == 4 ? <i className="fas fa-dice-four dice"></i>
                                    : dice == 5 ? <i className="fas fa-dice-five dice"></i> : dice == 6 ? <i className="fas fa-dice-six dice"></i>
                                        : <Image src={rolling} fluid style={drg == "Single Player"? { width: "400px", height: "400px" } :{ width: "380px", height: "380px" }}></Image>}
                            {drg == "Single Player" ? <></>:
                            <>
                            {dice2 == 1 ? <i className="fas fa-dice-one dice"></i> : dice2 == 2 ? <i className="fas fa-dice-two dice"></i>
                                : dice2 == 3 ? <i className="fas fa-dice-three dice"></i> : dice2 == 4 ? <i className="fas fa-dice-four dice"></i>
                                    : dice2 == 5 ? <i className="fas fa-dice-five dice"></i> : dice2 == 6 ? <i className="fas fa-dice-six dice"></i>
                                        : <Image src={rolling} fluid style={{ width: "380px", height: "380px" }}></Image>}</>}
                            <br></br>
                            <h5 className="gold mt-2">Your wallet:&emsp;{dcs} DCs</h5>
                            <Form.Row className="mt-1 coininput">
                                <Form.Group as={Col} size="lg" controlId="unc" className="ml-5">
                                    <Form.Label>Single Player or VS CPU</Form.Label>
                                    <Form.Control
                                        as="select"
                                        placeholder="No"
                                        value={drg}
                                        onChange={(e) => setDRG(e.target.value)}
                                    >
                                        {['Single Player', 'VS CPU'].map(s => <option key={s} value={s}>{s}</option>)}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} size="md" controlId="betamount">
                                    <Form.Label>Bets</Form.Label>
                                    <Form.Control
                                        type="number"
                                        placeholder="Bet amount"
                                        value={bet}
                                        onChange={(e) => setBet(e.target.value)}
                                    />
                                </Form.Group>
                                {drg == "Single Player" ?
                                    <Form.Group as={Col} size="lg" controlId="unc" className="mr-5">
                                        <Form.Label>Roll Prediction</Form.Label>
                                        <Form.Control
                                            as="select"
                                            placeholder="No"
                                            value={drEvent}
                                            onChange={(e) => setDRE(e.target.value)}
                                        >
                                            {['1', '2', '3', '4', '5', '6', 'Odd', 'Even'].map(s => <option key={s} value={s}>{s}</option>)}
                                        </Form.Control>
                                    </Form.Group> :
                                    <Form.Group as={Col} size="lg" controlId="unc" className="mr-5">
                                        <Form.Label>I'm going to roll</Form.Label>
                                        <Form.Control
                                            as="select"
                                            placeholder="No"
                                            value={drEventcpu}
                                            onChange={(e) => setDREcpu(e.target.value)}
                                        >
                                            {['Lower', 'Higher'].map(s => <option key={s} value={s}>{s}</option>)}
                                        </Form.Control>
                                    </Form.Group>
                                }
                            </Form.Row>
                            {bet > dcs || bet < 0 ? <h4 className="red">You don't have that much money to bet or bet amount less than 0</h4> :
                                drg == "Single Player" ?
                                <Button onClick={(e) => diceRoll(e)} className="loginbutton mt-2" disabled={bet == null}>
                                    Roll Die
                                </Button>
                                :
                                <>
                                <Button onClick={(e) => diceRoll2(e)} className="loginbutton mt-2 mr-1" disabled={myturn == true}>
                                    New Game
                                </Button>
                                <Button onClick={(e) => diceRoll2(e)} className="loginbutton mt-2 ml-1" disabled={bet == null || myturn == false}>
                                    My Roll
                                </Button>
                                </>
                            }
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="">
                        <Button variant="primary" onClick={handleCloseDR} className="loginbutton">
                            I love this game
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            :
            <div className="content">
                <Row className="justify-content-md-center mt-5">
                    <Image src={logo} className="ml-5" fluid style={{ width: "15%", height: "15%" }} />
                </Row>
                <Row className="justify-content-md-center ml-5 mr-5 mt-3">
                    <h4 className="paidtxt">Danny the dinosaur sees that you are not logged in. In order to play games you must be logged in. Please go <a href="/login">login</a>, if you don't have an account you can go <a href="/signup">signup</a>. You get 10,000 DCs (fake currency) to begin. If you're an UNC student, you get 20,000 DCs to begin. (Favorite Teams option is currently disabled in signup)</h4>
                </Row>
            </div>
    )
}

export default Game;