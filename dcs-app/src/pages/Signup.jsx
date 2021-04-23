import React, { useState, useContext, useEffect } from "react";
import UserContext from '../context/UserContext.js';
import uri from '../context/APIPort';
import { Form, Container, Button, Col } from "react-bootstrap";
import "../style/Signup.css";
import { useHistory } from "react-router-dom";
import Axios from "axios";

export default function Signup() {
    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("NC");
    const [unc, setUnc] = useState(false);
    const [isUncst, setisUncst] = useState("No");
    const [favorite, setFavorite] = useState([]);
    const [dcs, setDcs] = useState(10000);
    const { setUserData } = useContext(UserContext);

    const statesList = ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'];

    function validateForm() {
        return username.length > 0 && password.length > 0 && passwordCheck.length > 0 && fname.length > 0 && lname.length > 0 && password === passwordCheck;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const signupUser = { username, password, fname, lname, city, state, unc, favorite, dcs };
        try {
            await Axios.post(uri + "/assets/userCreate", signupUser);
            const loginUser = { username, password };
            const loginRes = await Axios.post(uri + "/assets/login", loginUser);
            setUserData({
                token: loginRes.data.token,
                userInfo: loginRes.data.userInfo
            });
            localStorage.setItem("auth-token", loginRes.data.token);
            console.log("hi")
            history.push('/');
        } catch (err) {
            console.log(err.response.data);
        }
    }

    const isUnc = (id) =>{
        if(id == "No"){
            setUnc(false);
            setDcs(10000);
            setisUncst("No");
        } else {
            setUnc(true);
            setDcs(20000);
            setisUncst("Yes");
        }
    }

    return (
        <>
            <h3 className="text-center pt-2 mt-4 suformtxt">Sign up to join the fun</h3>
            <Container className="signup pb-2 pt-1 col-md-6">
                <Form onSubmit={handleSubmit} className="pt-3">
                    <Form.Row>
                        <Form.Group as={Col} size="lg" controlId="fname">
                            <Form.Label>First name</Form.Label>
                            <Form.Control
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
                                type="text"
                                placeholder="Jordan"
                                value={lname}
                                onChange={(e) => setLname(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Group size="lg" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            placeholder="michael_jordan"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Row>
                        <Form.Group as={Col} size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="•••••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} size="lg" controlId="passwordCheck">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="•••••••••••"
                                value={passwordCheck}
                                onChange={(e) => setPasswordCheck(e.target.value)}
                            />
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} size="lg" controlId="unc">
                            <Form.Label>Are you a UNC Chapel Student?</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="No"
                                value={isUncst}
                                onChange={(e) => isUnc(e.target.value)}
                            >
                                {['No', 'Yes'].map(s => <option key={s} value={s}>{s}</option>)}
                            </Form.Control>
                        </Form.Group>
                        <Button as={Col} size="lg" controlId="favorite" className="favorite">
                            Select your favorite teams
                        </Button>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} size="lg" controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Chapel Hill"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group as={Col} size="lg" controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control
                                as="select"
                                placeholder="NC"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                            >
                                {statesList.map(s => <option key={s} value={s}>{s}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Button block size="lg" type="submit" className="submitsu" disabled={!validateForm()}>
                        Sign Up
                    </Button>

                </Form>
            </Container> </>
    );
}