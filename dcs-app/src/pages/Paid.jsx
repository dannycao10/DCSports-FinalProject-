import logo from '../images/dannydino.png'
import { Image, Container, Row } from 'react-bootstrap'

function Paid() {
    return (
        <div>
            <Row className="justify-content-md-center mt-5">
                <Image src={logo} className="ml-5" fluid style={{ width: "15%", height: "15%" }} />
            </Row>
            <Row className="justify-content-md-center ml-5 mr-5 mt-3">
                <h4 className="paidtxt">Danny the dinosaur doesn't know how legal it is do this yet, but in the mean time you can watch the full length of Kobe Bryant's 81 point game and his last game. You can also <a href="/freebets">"free" bet</a> or play our <a href="/games">betting games</a> using DCs (fake currency).</h4>
            </Row>
            <Row className="justify-content-md-center ml-5 mr-5 mt-3 mb-5">
                <iframe width="900" height="600"src="https://www.youtube.com/embed/d8UJHvDjslo" className="mt-2"></iframe>
                <iframe width="900" height="600"src="https://www.youtube.com/embed/dgLZKCG-_Yk" className="mt-4"></iframe>
            </Row>
        </div>
    )
}

export default Paid;