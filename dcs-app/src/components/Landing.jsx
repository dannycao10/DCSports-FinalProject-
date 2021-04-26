import { Form, Container, Button } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import uri from '../context/APIPort';
import '../style/Landing.css'

function Landing() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const history = useHistory();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { userData, setUserData } = useContext(UserContext);

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const loginUser = { username, password };
        const url = uri + "/assets/login";
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
            console.log(err);
        }
    }

    return (
        <div>
            <h1 className="landingpage mt-4">Welcome to</h1>
            <h1 className="landinglogo mt-2 mb-2"> <i className="fas fa-basketball-ball mr-2 basketball"></i> <i className="fas fa-hockey-puck mr-2 hockey"></i>DC Sports <i className="fas fa-baseball-ball ml-2 baseball"></i> <i className="fas fa-football-ball ml-2 football"></i></h1>
            {userData.token !== undefined ?<h1 className="landingpage">{userData.userInfo.fname}, you currently have a balance of {userData.userInfo.dcs} DCs!</h1> : <h1 className="landingpage"> Where you can recieve sports score updates and gamble a little!</h1>}
            <h1 className="landinglogo mt-2 mb-2">So let the betting begin!</h1>
            <Container className="pt-2 col-md-6 mt-5">
                {userData.token !== undefined ? <></>
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