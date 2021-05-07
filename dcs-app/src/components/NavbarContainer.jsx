import React, { useContext } from 'react';
import { Navbar, Nav, Button, NavDropdown, Image } from 'react-bootstrap';
import { HashLink as HLink } from 'react-router-hash-link';
import { Route, Switch } from 'react-router-dom';
import '../style/Navbar.css'
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Game from '../pages/Game.jsx';
import Free from '../pages/Free.jsx';
import Paid from '../pages/Paid.jsx';
import Profile from '../pages/Profile.jsx';
import Purchase from '../pages/Purchase.jsx';
import { useHistory } from "react-router-dom";
import UserContext from "../context/UserContext.js";


function NavbarContainer() {
    const { userData, setUserData } = useContext(UserContext);

    const history = useHistory();
    const logout = () => {
      setUserData({
        token: undefined,
        userInfo: undefined,
      })
      localStorage.clear();
      history.push('/');
    };

    return (
        (userData.token !== undefined) ?
        <>
            <Navbar sticky="top" bg="light" variant="light" className="navbar" expand="md" collapseOnSelect>
                <Navbar.Brand className="mr-auto logo-nav logonav" href="/">DC Sports</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto roboto navoption">
                        <Nav.Link href="/profile">Welcome, {userData.userInfo.fname}</Nav.Link>
                        <Nav.Link href="/purchase">${userData.userInfo.dcs}</Nav.Link>
                        <NavDropdown title="Place Bets" id="basic-nav-dropdown" className="position-sticky">
                            {/* <NavDropdown.Item href="/freebets">Free Bets</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item href="/paidbets">Paid Bets</NavDropdown.Item> */}
                            <NavDropdown.Item href="/videos">Videos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/games">Games</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="/info/#contactSection">Contact Us</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Button onClick={logout} variant="dark" className="ml-2 navoption">Log Out</Button>
                </Navbar.Collapse>
            </Navbar>
            <Switch id="bodyContent">
                <Route exact path="/" component={Home} />
                <Route path='/freebets' component={Free} />
                {/* <Route path='/paidbets' component={Paid} /> */}
                <Route path='/videos' component={Paid} />
                <Route path='/games' component={Game} />
                <Route path='/profile' component={Profile} />
                <Route path='/purchase' component={Purchase} />
            </Switch>
        </>


        :

        <>
            <Navbar sticky="top" bg="light" variant="light" className="navbar" expand="md" collapseOnSelect>
                <Navbar.Brand className="mr-auto logo-nav logonav" href="/">DC Sports</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto roboto navoption">
                        <Nav.Link as={HLink} to="/login">Login</Nav.Link>
                        <NavDropdown title="Place Bets" id="basic-nav-dropdown" className="position-sticky">
                            {/* <NavDropdown.Item href="/freebets">Free Bets</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            {/* <NavDropdown.Item href="/paidbets">Paid Bets</NavDropdown.Item> */}
                            <NavDropdown.Item href="/videos">Videos</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/games">Games</NavDropdown.Item>
                            {/* <NavDropdown.Divider />
                            <NavDropdown.Item href="/info/#contactSection">Contact Us</NavDropdown.Item> */}
                        </NavDropdown>
                    </Nav>
                    <Button as={HLink} to="/signup" variant="dark" className="ml-2 navoption">Sign Up</Button>
                </Navbar.Collapse>
            </Navbar>
            <Switch id="bodyContent">
                <Route exact path="/" component={Home} />
                <Route path='/signup' component={Signup} />
                <Route path='/login' component={Login} />
                <Route path='/freebets' component={Free} />
                {/* <Route path='/paidbets' component={Paid} /> */}
                <Route path='/videos' component={Paid} />
                <Route path='/games' component={Game} />
            </Switch>
        </>
    );
}

export default NavbarContainer;