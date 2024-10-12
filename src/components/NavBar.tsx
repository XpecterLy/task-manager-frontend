import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from "react-bootstrap/esm/Form";

export function NavBarComponet(){
    return (
        <>
        <Form.Group className="mb-4">
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/home">Manager</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Inicio</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            </Form.Group>
        </>
    )
}