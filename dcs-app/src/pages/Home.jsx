import { Row, Col, Image, Tab, Nav } from "react-bootstrap";

function Home() {
    return (
        <div>
            <Tab.Container defaultActiveKey="home" >
                <Row className="pt-2 px-3">
                    <Col sm={2} className="">
                        <Nav color="dark" variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="home">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="basketball">Basketball</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="football">Football</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="baseball">Baseball</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="hockey">Hockey</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="soccer">Soccer</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="other">Other Sports</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col>
                        <Tab.Content className="pt-3 px-5">
                            <Tab.Pane eventKey="home">
                                
                            </Tab.Pane>
                            <Tab.Pane eventKey="basketball">
                                
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
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}

export default Home;