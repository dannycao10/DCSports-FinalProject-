import { Form, Container, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import cards from '../images/cards.png'
import uri from '../context/APIPort';
// import { Hand, Card, CardBack } from 'react-deck-o-cards';

const Blackjack = (props) => {
    const { userData, setUserData } = useContext(UserContext);
    const [dcs, setDCS] = useState(userData.userInfo.dcs);

    const handleChange = async (e, amount) => {
        const updatedDCS = {
            user: userData.userInfo._id,
            dcs: dcs + amount
        }
        setDCS(dcs + amount);
        await Axios.put(uri + "/assets/updateDCS", updatedDCS)
    }

    const [deck, setDeck] = useState()

    async function getDeck() {
        const response = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
        const deck = await response.json();
        setDeck(deck);
    }

    useEffect(() => {
        getDeck();
    }, [])

    return (
        <>
            <Modal show={props.blackjack} onHide={props.hideBlackjack} size="lg">
                <Modal.Header closeButton={props.hideBlackjack}>
                    <Modal.Title className="gametitle ">Blackjack <Image src={cards} fluid style={{ width: "50px", height: "50px" }}></Image></Modal.Title>
                </Modal.Header>
                <Modal.Body className="gcontent text-center">
                </Modal.Body>
                <Modal.Footer className="">
                    <Button variant="primary" onClick={props.hideBlackjack} className="loginbutton">
                        I love this game
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default Blackjack;