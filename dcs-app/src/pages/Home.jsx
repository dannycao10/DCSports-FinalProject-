import { Row, Col, Image, Tab, Nav } from "react-bootstrap";
import '../style/Home.css'
import Landing from "../components/Landing.jsx"
import Basketball from "../components/Basketball.jsx"

function Home() {
    return (
        <div>
            <Tab.Container defaultActiveKey="home" className="tabcontainer">
                <Row className="pt-0 px-3 homerow">
                    <Nav color="dark" variant="pills" className="flex-row">
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="home" className="homeitem">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="basketball" className="homeitem">Basketball</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="football" className="homeitem">Football</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="baseball" className="homeitem">Baseball</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="hockey" className="homeitem">Hockey</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="soccer" className="homeitem">Soccer</Nav.Link>
                        </Nav.Item>
                        <Nav.Item className="eachtab">
                            <Nav.Link eventKey="other" className="homeitem">Other Sports</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Row>
                <Row className="justify-content-md-center">
                    <Tab.Content className="pt-3 px-5">
                        <Tab.Pane eventKey="home">
                            <Landing/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="basketball">
                            <Basketball/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="football">

                        </Tab.Pane>
                        <Tab.Pane eventKey="hockey">

                        </Tab.Pane>
                        <Tab.Pane eventKey="soccer">

                        </Tab.Pane>
                        <Tab.Pane eventKey="other">

                        </Tab.Pane>
                    </Tab.Content>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Home;