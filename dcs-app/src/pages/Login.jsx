import { Form, Container, Button } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import uri from '../context/APIPort';
import logo from '../images/dannydino.png'
import { Image, Row } from 'react-bootstrap'
import '../style/Login.css'

function Login() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {userData, setUserData } = useContext(UserContext);
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
            await Axios.post(url, loginUser).then(loginRes=> {
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
        <>
            <Container className="loginl pt-2 col-md-6">
                <h1 className="text-center pt-2 landingpageform">Login Here</h1>
                <Form className="pt-3" onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            placeholder="Username"
                            autoFocus
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="username landingform"
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
            </Container>
            <Row className="justify-content-md-center mt-5">
                <Image src={logo} className="ml-5" fluid style={{ width: "12%", height: "12%" }} />
            </Row>
        </>
    )
}

export default Login;