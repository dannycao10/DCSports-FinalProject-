import { Form, Container, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import uri from '../context/APIPort';
import '../style/Purchase.css'
import deposit from '../images/deposit.gif'

function Purchase() {
    const { userData, setUserData } = useContext(UserContext);
    const [dcs, setDCS] = useState(userData.userInfo.dcs);
    const [loading, setLoading] = useState(false)
    useEffect(() => { setDCS(userData.userInfo.dcs) }, [userData.userInfo.dcs])

    const handleChange = async (e, amount) => {
        const updatedDCS = {
            user: userData.userInfo._id,
            dcs: dcs + amount
        }
        setDCS(dcs + amount);
        await Axios.put(uri + "/assets/updateDCS", updatedDCS)
    }

    const addDCs = (e, amount) => {
        setLoading(true);
        setTimeout(function () {
            handleChange(e, parseInt(amount))
            setLoading(false);
        }, 9500);
    }

    return (
        <div>
            <h1 className="gamepage"><i className="fas fa-store"></i> Welcome to the shop (DCs are currently free) <i className="fas fa-store"></i></h1>
            <p className="gamepagesm">(Warning your $ on the top will update upon refresh of page)</p>
            <p className="wallet gamepagesm">Wallet: ${dcs}</p>
            <hr />
            {loading ?
                <div className="gcontent">
                    <h1 className="adding">Currently adding DCs to your account ... </h1>
                    <Image src={deposit} fluid style={{ width: "450px", height: "270px" }}></Image>
                </div>
                :
                <Row className="mt-5">
                    <Col className="text-center gcontent">
                        <Button className="loginbutton gbutton" onClick={(e) => addDCs(e, 100)}>+$100 <br></br> DCs</Button>
                    </Col>
                    <Col className="text-center gcontent">
                        <Button className="loginbutton gbutton" onClick={(e) => addDCs(e, 500)}>+$500 <br></br> DCs</Button>
                    </Col>
                    <Col className="text-center gcontent">
                        <Button className="loginbutton gbutton" onClick={(e) => addDCs(e, 1000)}>+$1000 <br></br> DCs</Button>
                    </Col>
                </Row>}
        </div>
    )
}
export default Purchase;