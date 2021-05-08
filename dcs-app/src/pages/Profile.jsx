import React, { useEffect, useState, useContext } from 'react';
import { Form, Container, Button, Row, Col, Image, Modal } from 'react-bootstrap';
import UserContext from "../context/UserContext.js";
import '../style/Profile.css'
import red from '../images/redD.png'
import green from '../images/greenD.png'
import yellow from '../images/yellowD.png'
import blue from '../images/blueD.png'
import unc from '../images/unc.png'
import updating from '../images/updating.gif'
import uri from '../context/APIPort'
import Axios from "axios"

function Profile() {
    const { userData, setUserData } = useContext(UserContext);
    const profile = [red, green, yellow, blue]

    const [username, setUsername] = useState(userData.userInfo.username);
    const [fname, setFname] = useState(userData.userInfo.fname);
    const [lname, setLname] = useState(userData.userInfo.lname);
    const [city, setCity] = useState(userData.userInfo.city);
    const [state, setState] = useState(userData.userInfo.state);
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleChange = async (e) => {
        const updatedDCS = {
            user: userData.userInfo._id,
            username: username,
            fname: fname,
            lname: lname,
            city: city,
            state: state
        }
        await Axios.put(uri + "/assets/updateProfile", updatedDCS)
    }

    const handleShow = () => setEdit(true);
    const handleClose = () => {
        setEdit(false);
        setUsername(userData.userInfo.username);
        setFname(userData.userInfo.fname);
        setLname(userData.userInfo.lname);
        setCity(userData.userInfo.city);
        setState(userData.userInfo.state);

    };

    const handleSave = (e) => {
        setLoading(true);
        setTimeout(function () {
            handleChange(e);
            setEdit(false);
            setLoading(false);
        }, 4000);
    };

    const statesList = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

    return (
        <div className="profilepage">
            <Row className="profilerow">
                <Col className={userData.userInfo.unc ? "uncprof" : "mainprof"}>
                    <Image src={green} fluid style={{ width: "300px", height: "300px" }} className="mt-4"></Image>
                    <h1 className="mt-4 mb-5 username">@{userData.userInfo.username}</h1>
                </Col>
                <Col className="profsect">
                    <h1 className="username mt-4 ml-2 mr-2">Welcome to your profile, {userData.userInfo.fname} {userData.userInfo.lname}</h1>
                    <h2 className="username mt-4 ml-2 mr-2">How's the weather down in {userData.userInfo.city}, {userData.userInfo.state}</h2>
                    <h2 className="username mt-4 ml-2 mr-2">Current Balance: {userData.userInfo.dcs} DCs</h2>
                </Col>
                <Col className="profsect">
                    <h5 className="username mt-4 ml-4 mr-4">There is not much on the profile page except for changing account info, sorry.</h5>
                    {userData.userInfo.unc ? <Image src={unc} fluid style={{ width: "220px", height: "180px" }} className="mt-1"></Image> : <></>}
                    <h5 className="username mt-1 ml-4 mr-4">But go heels tho!!!</h5>
                </Col>
            </Row>
            <Row className="profeditrow">
                {loading ?
                    <Col>
                        <div className="mt-5">
                            <Image src={updating} fluid style={{ width: "75px", height: "75px" }} className="mt-1"></Image>
                            <span className="profilepagesmall"> Currently updating profile ... (Refresh page to see update)</span>
                        </div>
                    </Col> :
                    <>
                        <Col sx={1}>
                        </Col>
                        <Col className="">
                            <Form.Group size="lg" as={Col} controlId="username" className="ml-2 mt-3">
                                {edit ?
                                    <>
                                        <span className="ml-2 editclick" onClick={(e) => handleSave(e)}>Save</span>
                                        <span className="ml-2 editclick" onClick={handleClose}>Cancel</span>
                                    </>
                                    :
                                    <span className="ml-2 editclick" onClick={handleShow}>Edit Profile</span>}
                            </Form.Group>
                            <Form.Group size="lg" as={Col} controlId="username" className="ml-2">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    disabled={!edit}
                                    placeholder="michael_jordan"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} size="lg" controlId="fname" className="mt-2">
                                <Form.Label>First name</Form.Label>
                                <Form.Control
                                    disabled={!edit}
                                    autoFocus
                                    type="text"
                                    placeholder="Michael"
                                    value={fname}
                                    onChange={(e) => setFname(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} size="lg" controlId="lname">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control
                                    disabled={!edit}
                                    type="text"
                                    placeholder="Jordan"
                                    value={lname}
                                    onChange={(e) => setLname(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group as={Col} size="lg" controlId="city" className="mt-2">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    disabled={!edit}
                                    type="text"
                                    placeholder="Enter city here"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group as={Col} size="lg" controlId="state" className="mt-0">
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    disabled={!edit}
                                    as="select"
                                    placeholder="NC"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col sx={1}>
                        </Col>
                    </>
                }
            </Row>
        </div>
    )
}

export default Profile;