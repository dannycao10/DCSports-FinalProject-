import {Form, Container, Button} from 'react-bootstrap';
import {useState} from 'react'
import '../style/Landing.css'

function Landing() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    return (
        <div>
            <h1 className="landingpage mt-4">Welcome to <h1 className="landinglogo mt-2 mb-2"> <i class="fas fa-basketball-ball mr-2 basketball"></i> <i class="fas fa-hockey-puck mr-2 hockey"></i>DC Sports <i class="fas fa-baseball-ball ml-2 baseball"></i> <i class="fas fa-football-ball ml-2 football"></i></h1> Where you can recieve sports score updates and gamble a little!</h1>
            <Container className="pt-2 col-md-6 mt-5">
                <h1 className="text-center pt-2 landingpageform">Login Here</h1>
                <Form className="pt-3">
                    <Form.Group size="lg" controlId="email">
                        <Form.Control
                            placeholder="Username"
                            autoFocus
                            type= "text"
                            // value={username}
                            // onChange={(e) => setUsername(e.target.value)}
                            className="username landingform"
                        />
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Control
                            placeholder="Password"
                            type={passwordShown ? "text" : "password"}
                            // value={password}
                            // onChange={(e) => setPassword(e.target.value)}
                            className="landingform"
                        />
                        <h6 onClick={togglePasswordVisiblity} className="showonly">{passwordShown ? "Hide" : "Show"}</h6>
                    </Form.Group>
                    <Button block size="lg" type="submit" className="loginbutton">
                        Sign In
                    </Button>
                    <h6 className="landingsu mt-2">Don't have an account? <a href="/registration" className="litsu">Sign up</a></h6>
                </Form>
            </Container>
        </div>
    )
}

export default Landing;